# Consultation form email delivery

Approved flow: contact form -> first-party POST /api/enquiry -> Resend -> info@jeffreysuffian.com.
Verified sender: Jeffrey Suffian Website <enquiries@notify.jeffreysuffian.com>. Visitor email is Reply-To only. No automatic visitor email.

RESEND_API_KEY is a server-only Production Secret already saved by the user in Vercel. Do not retrieve or expose it. VITE_ENQUIRY_ENDPOINT defaults to /api/enquiry; an explicit blank disables submissions.

Validation: POST, production Origin allowlist, JSON, 16KB payload, required consent, allowed services, email and length checks, header injection rejection, honeypot. Recipient and sender are fixed on the server. Plain text email prevents HTML injection. Ten-second provider timeout; success requires a Resend email id. No personal details or credentials are written to application logs. Client success means accepted for delivery, not guaranteed inbox placement.

Spam controls: five attempts per ten minutes per hashed IP per warm instance; bounded memory. This is best effort and does not provide a distributed rate limit across cold starts/instances. Provider idempotency deduplicates the same content within a ten-minute window. For sustained abuse, add Vercel Firewall rate limits or a server-verified challenge.

Deployment verification: unit tests cover payload routing, validation, provider failures and throttling. A labelled synthetic test may be sent to the authorized office recipient to verify acceptance. Inbox delivery must be checked by the office or Resend delivery logs; never infer inbox receipt from HTTP success alone.
