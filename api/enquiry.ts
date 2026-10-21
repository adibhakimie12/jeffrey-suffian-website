import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

const services = new Set(['Statutory Audit & Assurance', 'Tax Compliance & Advisory', 'Business Advisory', 'Due Diligence & Business Valuation', 'Corporate Recovery', 'Corporate Finance', 'SME Advisory', 'Not sure — please advise']);
const origins = new Set(['https://jeffreysuffian.com', 'https://www.jeffreysuffian.com', 'https://jeffrey-suffian-website.vercel.app']);
type Request = IncomingMessage & { body?: unknown };

// Local-instance throttling supplements the honeypot and strict request validation.
// It is not a distributed rate limiter across Vercel instances.
export function createEnquiryHandler(options: { fetch?: typeof fetch; apiKey?: () => string | undefined } = {}) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function handler(req: Request, res: ServerResponse) {
    const respond = (status: number, success = false) => { res.statusCode = status; res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify({ success })); };
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return respond(405); }
    if (!origins.has(String(req.headers.origin ?? ''))) return respond(403);
    if (!String(req.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) return respond(415);
    let body: Record<string, unknown>;
    try {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (!raw || Buffer.byteLength(raw) > 16000) return respond(413);
      body = JSON.parse(raw);
      if (!body || Array.isArray(body) || typeof body !== 'object') return respond(400);
    } catch { return respond(400); }
    if (body.website) return respond(400);
    const value = (key: string, max: number, required = false) => {
      const input = body[key];
      if (input == null && !required) return '';
      if (typeof input !== 'string' || input.length > max || (required && !input.trim()) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(input)) throw new Error('invalid');
      return input.trim();
    };
    let name: string, email: string, company: string, phone: string, service: string, message: string;
    try {
      name = value('name', 250, true); email = value('email', 250, true);
      company = value('company', 250); phone = value('phone', 250);
      service = value('service', 100, true); message = value('message', 4000, true);
      if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(name + email + company + phone) || !services.has(service) || body.consent !== 'on') throw new Error('invalid');
    } catch { return respond(400); }
    const now = Date.now();
    for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
    const ip = String(req.headers['x-vercel-forwarded-for'] ?? req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
    const fingerprint = createHash('sha256').update(ip).digest('hex');
    const entry = attempts.get(fingerprint) ?? { count: 0, expires: now + 600000 };
    if (entry.count >= 5 || attempts.size >= 10000) { res.setHeader('Retry-After', '600'); return respond(429); }
    entry.count++; attempts.set(fingerprint, entry);
    const apiKey = (options.apiKey ?? (() => process.env.RESEND_API_KEY))();
    if (!apiKey) return respond(503);
    const text = `New website consultation request\n\nName: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}\n\nConsent: Provided to respond to this enquiry.\n`;
    try {
      const response = await (options.fetch ?? fetch)('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': createHash('sha256').update(JSON.stringify({ name, email, company, phone, service, message, window: Math.floor(now / 600000) })).digest('hex') },
        body: JSON.stringify({ from: 'Jeffrey Suffian Website <enquiries@notify.jeffreysuffian.com>', to: ['info@jeffreysuffian.com'], reply_to: email, subject: `Website enquiry — ${service}`, text }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json();
      if (!response.ok || typeof result.id !== 'string') return respond(502);
      return respond(200, true);
    } catch { return respond(502); }
  };
}

export default createEnquiryHandler();
