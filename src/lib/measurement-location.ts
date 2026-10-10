export function measurementLocation(location: string) {
  const url = new URL(location);
  const campaign = new URLSearchParams();
  const allowed = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic', 'gclid', 'gbraid', 'wbraid', 'dclid', 'gad_source', 'gad_campaignid']);
  for (const [key, value] of url.searchParams) if (allowed.has(key)) campaign.append(key, value);
  return `${url.origin}${url.pathname}${campaign.size ? `?${campaign}` : ''}`;
}
