import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FloatingContact({ href, number, showConsult }: { href: string; number: string; showConsult: boolean }) {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const update = () => setEditing(document.activeElement instanceof HTMLElement && document.activeElement.matches('input, textarea, select, [contenteditable="true"]'));
    const afterBlur = () => queueMicrotask(update);
    document.addEventListener('focusin', update);
    document.addEventListener('focusout', afterBlur);
    return () => { document.removeEventListener('focusin', update); document.removeEventListener('focusout', afterBlur); };
  }, []);
  return <aside aria-label="Quick contact" className="contact-dock" hidden={editing}>
    {showConsult && <a href="/contact" aria-label="Request consultation" data-event="request_consultation_click" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-signature-yellow px-4 text-xs font-bold uppercase tracking-wide text-obsidian shadow-lg md:hidden"><Phone aria-hidden="true" className="h-4 w-4" />Consult</a>}
    <a href={href} target="_blank" rel="noopener noreferrer" data-event="whatsapp_click" aria-label={`WhatsApp Jeffrey Suffian on ${number} (opens in a new tab)`} title={`WhatsApp: ${number}`} className="whatsapp-float">
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
    </a>
  </aside>;
}
