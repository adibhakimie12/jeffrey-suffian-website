import React, { useEffect, useState } from 'react';
import { measurementLocation } from '../lib/measurement-location';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const env = import.meta.env;
const gtm = /^GTM-[A-Z0-9]+$/.test(env.VITE_GTM_ID ?? '') ? env.VITE_GTM_ID : '';
const ga4 = /^G-[A-Z0-9]+$/.test(env.VITE_GA4_ID ?? '') ? env.VITE_GA4_ID : '';
const ads = /^AW-\d+$/.test(env.VITE_GOOGLE_ADS_ID ?? '') ? env.VITE_GOOGLE_ADS_ID : '';
const configured = Boolean(gtm || ga4 || ads);
const consentKey = 'js-analytics-consent-v1';
let activated = false;
let allowed = false;

function loadScript(src: string) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function activate() {
  if (activated || !configured) return;
  activated = true;
  window.dataLayer ??= [];
  // Preserve Google's arguments object command format for both gtag and GTM.
  window.gtag ??= function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (gtm) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtm}`);
  } else {
    window.gtag('js', new Date());
    if (ga4) window.gtag('config', ga4, { send_page_view: false });
    if (ads) window.gtag('config', ads);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4 || ads}`);
  }
  trackEvent('page_view');
}

export function trackEvent(event: string, params: Record<string, string | number> = {}) {
  if (!allowed || !configured || typeof window === 'undefined') return;
  const safe = { page_path: window.location.pathname, ...params };
  if (gtm) window.dataLayer.push({ event, ...safe });
  else window.gtag?.('event', event, { ...safe, page_location: measurementLocation(window.location.href) });
  // Only an accepted enquiry is a lead. CTA, phone and email clicks are separate signals.
  if (!gtm && ads && env.VITE_GOOGLE_ADS_LEAD_LABEL && event === 'generate_lead') {
    window.gtag?.('event', 'conversion', { send_to: `${ads}/${env.VITE_GOOGLE_ADS_LEAD_LABEL}` });
  }
}

const clickEvents = new Set(['request_consultation_click', 'phone_click', 'service_page_cta_click', 'partner_profile_view', 'blog_cta_click', 'email_click']);

export function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!configured) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem(consentKey); } catch { /* Ask each visit if storage is unavailable. */ }
    allowed = saved === 'accepted';
    setOpen(saved !== 'accepted' && saved !== 'declined');
    if (allowed) activate();
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('a[data-event],button[data-event]') : null;
      const name = element?.dataset.event;
      if (name && clickEvents.has(name)) trackEvent(name);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function choose(accept: boolean) {
    const wasAllowed = allowed;
    allowed = accept;
    try { localStorage.setItem(consentKey, accept ? 'accepted' : 'declined'); } catch { /* In-memory choice still applies. */ }
    setOpen(false);
    if (accept) activate();
    else if (wasAllowed) window.location.reload();
  }

  if (!configured) return null;
  if (!open) return <button type="button" onClick={() => setOpen(true)} className="fixed bottom-2 left-2 z-[60] rounded border border-charcoal/20 bg-white px-3 py-2 text-xs text-charcoal shadow">Cookie settings</button>;
  return <aside aria-label="Cookie preferences" className="fixed bottom-20 left-4 right-4 z-[60] max-w-lg rounded-lg border border-charcoal/20 bg-white p-5 text-charcoal shadow-xl md:bottom-4"><h2 className="font-serif text-lg">Your cookie preferences</h2><p className="mt-2 text-sm leading-6">With your permission, we use Google Analytics and advertising measurement to understand visits and enquiries. <a href="/privacy-policy" className="underline">Privacy policy</a></p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => choose(false)} className="min-h-11 rounded border border-charcoal/20 px-4 text-sm">Decline optional cookies</button><button type="button" onClick={() => choose(true)} className="min-h-11 rounded bg-signature-yellow px-4 text-sm font-bold">Accept measurement cookies</button></div></aside>;
}
