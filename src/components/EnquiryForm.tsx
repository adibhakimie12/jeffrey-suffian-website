import React, { useState } from 'react';
import { trackEvent } from './AnalyticsConsent';
import { ArrowUpRight, LockKeyhole, Phone } from 'lucide-react';

// A first-party endpoint is supplied by the client's hosting/backend setup.
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT ?? '';
const ready = /^\/(?!\/)[a-zA-Z0-9/_-]+$/.test(endpoint);
const serviceNames = ['Statutory Audit & Assurance', 'Tax Compliance & Advisory', 'Business Advisory', 'Due Diligence & Business Valuation', 'Corporate Recovery', 'Corporate Finance', 'SME Advisory'];

export function EnquiryForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return;
    setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)), signal: controller.signal,
      });
      // A 200 HTML fallback is not an accepted enquiry. Require explicit acknowledgement.
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Enquiry was not accepted');
      setStatus('sent');
      trackEvent('generate_lead', { method: 'enquiry_form', service: String(data.get('service')) });
      form.reset();
    } catch { setStatus('error'); }
    finally { clearTimeout(timeout); }
  }

  return <div className="min-w-0 overflow-hidden rounded-2xl border border-charcoal/15 bg-white shadow-[0_16px_48px_rgba(17,17,17,0.05)]">
    <div className="brand-accent-strip h-1" />
    <form onSubmit={submit} aria-labelledby="enquiry-heading" aria-describedby={!ready ? 'enquiry-availability enquiry-guidance' : 'enquiry-guidance'} aria-busy={status === 'sending'} className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-signature-red">Start a conversation</p>
      <h2 id="enquiry-heading" className="mt-3 font-serif text-3xl leading-snug text-obsidian sm:text-4xl">What can we help<br className="hidden sm:block" /> you move forward?</h2>
      <p className="mt-4 max-w-xl text-base leading-8 text-charcoal/85">A little context is a good place to start. Tell us about your business, the support you need and any deadline you have in mind.</p>
      {!ready && <div id="enquiry-availability" className="mt-6 rounded-xl border border-champagne/40 bg-champagne/10 p-5 text-sm leading-7 text-obsidian"><p className="flex items-center gap-2 font-bold"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" />Online enquiries are not available yet.</p><p className="mt-2">This form is not currently accepting submissions. Please call or email our office to discuss your requirements.</p><p className="mt-3 font-semibold">Office phone: 03-7660 3915 / 3917</p><p className="mt-1">Email: <a href={`mailto:${email}`} data-event="email_click" className="break-words font-semibold underline underline-offset-4">{email}</a></p></div>}
      <p className="mb-7 mt-7 text-sm text-charcoal/75">Fields marked * are required.</p>
      <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-6 w-full"><span className="flex items-center gap-3"><span aria-hidden="true" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-bold text-signature-red">01</span><span className="text-lg font-semibold text-obsidian">A little about you</span></span></legend>
      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field label="Full name *" name="name" autoComplete="name" placeholder="Your full name" required />
        <Field label="Company" name="company" autoComplete="organization" placeholder="Your company name" />
        <Field label="Email address *" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder="you@company.com" required />
        <Field label="Phone number" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. +60 12 345 6789" />
      </div>
      </fieldset>
      <fieldset className="mt-8 min-w-0 border-0 border-t border-solid border-charcoal/10 p-0 pt-7">
      <legend className="w-full pt-8"><span className="flex items-center gap-3"><span aria-hidden="true" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-bold text-signature-red">02</span><span className="text-lg font-semibold text-obsidian">Your business needs</span></span></legend>
      <div className="grid min-w-0 gap-5">
        <label className="min-w-0 text-sm font-semibold text-obsidian">Service required *<select name="service" required defaultValue="" className="enquiry-control mt-2 min-h-14 w-full min-w-0 rounded-xl border border-charcoal/20 bg-paper/55 px-4 py-3 text-base font-normal"><option value="" disabled>Select a service</option>{serviceNames.map((name) => <option key={name}>{name}</option>)}<option>Not sure — please advise</option></select></label>
        <label className="min-w-0 text-sm font-semibold text-obsidian">How can we help? *<textarea name="message" required maxLength={4000} placeholder="Tell us about your business, the support you need and any relevant deadline." aria-describedby="enquiry-guidance" className="enquiry-control mt-2 min-h-40 w-full resize-y rounded-xl border border-charcoal/20 bg-paper/55 px-4 py-4 text-base font-normal leading-7" /></label>
      </div>
      </fieldset>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p id="enquiry-guidance" className="mt-3 flex items-start gap-2 text-xs leading-6 text-charcoal/70"><LockKeyhole aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0" />Please do not include passwords, bank details or sensitive financial records.</p>
      <label className="mt-5 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-charcoal/80"><input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-signature-red" /><span>I agree that my details may be used to respond to this enquiry. <a href="/privacy-policy" className="font-semibold underline underline-offset-4">Privacy policy</a></span></label>
      <button type="submit" disabled={!ready || status === 'sending'} aria-describedby={!ready ? 'enquiry-availability' : undefined} className="mt-6 inline-flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-signature-yellow px-5 py-4 text-sm font-bold text-obsidian transition-colors hover:bg-champagne disabled:cursor-not-allowed disabled:bg-charcoal/15 disabled:text-charcoal/60">{status === 'sending' ? 'Sending enquiry…' : 'Request consultation'}<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></button>
      <p role={status === 'error' ? 'alert' : 'status'} aria-live="polite" className="mt-4 text-sm leading-6 text-charcoal/80">{status === 'sent' ? 'Thank you. Your enquiry has been received.' : status === 'error' ? 'Your enquiry could not be sent. Please try again or call our office on 03-7660 3915 / 3917.' : ready ? 'Your details will be used to respond to your enquiry.' : 'Call to discuss your enquiry: '} {!ready && <><a href="tel:+60376603915" data-event="phone_click" className="font-semibold underline underline-offset-4">03-7660 3915</a><span> / </span><a href="tel:+60376603917" data-event="phone_click" className="font-semibold underline underline-offset-4">03-7660 3917</a></>}</p>
    </form>
  </div>;
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="min-w-0 text-sm font-semibold text-obsidian">{label}<input {...props} maxLength={250} className="enquiry-control mt-2 min-h-14 w-full min-w-0 rounded-xl border border-charcoal/20 bg-paper/55 px-4 py-4 text-base font-normal" /></label>;
}
