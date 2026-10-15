import { ArrowDown, ArrowRight } from 'lucide-react';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  career?: string;
  image: string;
};

export function TeamShowcase({ title, description, members }: { title: string; description: string; members: TeamMember[] }) {
  const partners = members.filter(person => person.role === 'Partner');
  const team = members.filter(person => person.role !== 'Partner');
  return <>
    <section className="firm-backdrop bg-paper pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pb-16">
        <nav aria-label="Breadcrumb" className="text-sm text-charcoal/80"><a href="/" className="hover:underline">Home</a><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{title}</span></nav>
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-signature-red">The people behind our firm</p>
            <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.12] text-obsidian sm:text-6xl">Our Partners<br /><span className="italic text-signature-red">&amp; Team.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-charcoal/85">{description}</p>
            <a href="#our-partners" className="mt-7 inline-flex min-h-12 items-center gap-4 text-sm font-bold text-obsidian">Get to know our people <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 bg-white"><ArrowDown aria-hidden="true" className="h-4 w-4" /></span></a>
          </div>
          <div className="team-portrait-lineup grid grid-cols-3 items-start gap-3 pb-5 sm:gap-5" aria-label="Meet our partners">
            {partners.map((person, index) => <a key={person.id} href={`#${person.id}`} className={`team-portrait-link group block min-w-0 ${index === 1 ? 'pt-12' : index === 2 ? 'pt-5' : ''}`} aria-label={`Read about ${person.name}`}>
              <div className="overflow-hidden rounded-t-[6rem] rounded-b-lg border border-charcoal/10 bg-white p-1 shadow-lg sm:p-1.5 shadow-charcoal/5"><img src={person.image} width="300" height="300" alt="" fetchPriority={index === 0 ? 'high' : undefined} className="team-portrait-image aspect-[3/4] w-full rounded-t-[6rem] rounded-b object-cover object-top" /></div>
              <span className="mt-4 block text-xs font-semibold leading-6 text-charcoal sm:text-sm">{person.name}</span><span className="text-[10px] font-bold uppercase tracking-widest text-signature-red">Partner</span>
            </a>)}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-charcoal/15 pt-6 text-xs font-semibold uppercase tracking-widest text-charcoal/75"><span>Jeffrey Suffian</span><span aria-hidden="true" className="h-1 w-1 rounded-full bg-signature-red" /><span>Chartered Accountants</span><span aria-hidden="true" className="h-1 w-1 rounded-full bg-signature-yellow" /><span>Petaling Jaya, Malaysia</span></div>
      </div>
    </section>

    <section id="our-partners" className="scroll-mt-28 bg-ivory py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Firm leadership</p><h2 className="mt-4 font-serif text-4xl leading-tight text-obsidian sm:text-5xl">Experience.<br /><span className="italic">With a personal connection.</span></h2></div><p className="max-w-lg text-base leading-8 text-charcoal/85 lg:justify-self-end">Get to know our partners and their professional backgrounds in audit, assurance and advisory.</p></div>
        <div className="space-y-8 lg:space-y-12">
          {partners.map((person, index) => <article key={person.id} id={person.id} data-team-reveal className="team-profile group grid scroll-mt-28 overflow-hidden rounded-2xl border border-charcoal/15 bg-white md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className={`team-profile-portrait relative flex items-center justify-center px-7 pb-0 pt-9 sm:px-10 ${index === 1 ? 'bg-[#EEE7DF] md:order-2' : index === 2 ? 'bg-[#F1EBD9]' : 'bg-[#EAE9E3]'}`}>
              <span aria-hidden="true" className="absolute left-5 top-4 font-serif text-4xl text-charcoal/25">0{index + 1}</span>
              <img src={person.image} width="300" height="300" alt={person.name} loading="lazy" decoding="async" className="team-portrait-image relative mt-4 aspect-square w-full max-w-[300px] rounded-t-[8rem] object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3"><span className="h-px w-8 bg-signature-red" aria-hidden="true" /><p className="text-xs font-bold uppercase tracking-widest text-signature-red">{person.role}</p></div>
              <h3 className="mt-5 font-serif text-3xl leading-snug text-obsidian lg:text-4xl">{person.name}</h3>
              <p className="mt-5 text-sm font-medium leading-7 text-charcoal/85">{person.credentials}</p>
              <p className="mt-6 border-t border-charcoal/15 pt-6 text-base leading-8 text-charcoal/85">{person.bio}</p>
              {person.career && <p className="mt-4 text-base leading-8 text-charcoal/85">{person.career}</p>}
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="firm-section-dots bg-paper py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-widest text-signature-red">Meet the team</p><h2 className="mt-4 font-serif text-4xl text-obsidian sm:text-5xl">Our Team</h2></div><a href="/contact" className="inline-flex min-h-12 items-center gap-3 text-sm font-bold">Connect with the firm <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div>
        <div className="grid gap-6 lg:grid-cols-2">
          {team.map(person => <article key={person.id} id={person.id} data-team-reveal className="grid scroll-mt-28 grid-cols-[6rem_minmax(0,1fr)] items-center gap-5 rounded-xl border border-charcoal/15 bg-white p-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-7 sm:p-7"><div className="overflow-hidden rounded-t-[5rem] rounded-b-lg bg-paper"><img src={person.image} alt={person.name} width="300" height="300" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" /></div><div><p className="text-[10px] font-bold uppercase tracking-widest text-signature-red sm:text-xs">{person.role}</p><h3 className="mt-3 font-serif text-xl leading-snug text-obsidian sm:text-2xl">{person.name}</h3><div aria-hidden="true" className="brand-accent-strip mt-5 h-0.5 w-12 rounded-full" /></div></article>)}
        </div>
      </div>
    </section>
  </>;
}
