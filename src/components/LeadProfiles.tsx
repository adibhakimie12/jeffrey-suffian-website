import React from 'react';
import { X, Mail, Award, BookOpen, Star, Sparkles, Building2 } from 'lucide-react';
import { Partner } from '../types';

export const partnersData: Partner[] = [
  {
    id: 'jeffrey',
    name: 'Jeffrey Bosra',
    role: 'Managing Partner',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3V7MQl8DvnoVIWyVH5kvgwwxmfAvYOAkuCBD62Eax6KkQ8qMB6o__OCFeG0W11DQhiIKMtRjnqqUcj0wZnAun-RrOIq5zDJ6ad1ApS2fJ7I-ZbVeEvwiNn2eXPwTA24CvCyoiDf1Suahf-Jxlj_aqFwoA0qUWZBWaWx7-egnrA1WKnGh_O5z3Tw7PDxOZ2Sj1BZi6rhFBEo5OYk1kXSzZ5oHD4qKexL69GzrnzjqWzDMFMVegkTjteaNEiaAHrQ3KJcvUurvoGhU3',
    shortBio: 'Specializing in statutory audit and corporate advisory for mid-market enterprises.',
    longBio: 'Jeffrey Bosra established the practice with a vision of bridging high-standard institutional accounting with tailored partner attention. With over 28 years of post-qualification audit experience spanning public listed corporations and multi-national subsidiaries, he acts as senior advisory lead on high-stakes corporate restructurings, M&A due diligence, and statutory reporting frameworks.',
    specialties: [
      'Statutory Financial Audit of Public Companies',
      'Corporate Restructuring & Integration',
      'Mergers & Acquisitions (M&A) Advisory',
      'Joint Ventures & Joint Venture Valuations'
    ],
    education: [
      'CA – Member of Malaysian Institute of Accountants (MIA)',
      'FCCA – Fellow of the Association of Chartered Certified Accountants, UK',
      'BSc (Hons) in Applied Accounting, Oxford Brookes University'
    ],
    email: 'j.bosra@jeffreysuffian.com.my'
  },
  {
    id: 'eddy',
    name: 'Eddy Suffian Yusof',
    role: 'Partner, Tax & Advisory',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOBYh6RHaGdRlEq7CDeOIMHI9eSwQQ8h3sFv-ifUkA_BF51hONgE4O0WI9d4ipdmuDn42WQj-weK6tSTsny6M2SouAg3Shkc-HXu-jb6T5GKiuwrrok5VpHyHixysD-0tW1u235OgoT6p1lk49ffObg-3nwa-qGQLvV3-OkUh5_J_3Xs0QG515o-BO4l_ibDdOVfqF2mxbgiHUM5inxOVy93a--6EHdZuPIEqJse_XcCtsJY7H7BlTI4dJGCQW0GST0d49gMgrSDKr',
    shortBio: 'Expertise in complex tax structuring and compliance for corporate entities.',
    longBio: 'Eddy leads the dynamic Tax practice, dealing extensively with Direct Taxes, SST, transfer pricing defenses, and corporate tax incentive negotiations. He frequently coordinates with the Inland Revenue Board of Malaysia (LHDN) and Royal Malaysian Customs Department on complex audit disputes, tax rulings, and specialized corporate exemptions.',
    specialties: [
      'Corporate Tax Planning & Efficiency Mapping',
      'Transfer Pricing Policy Design and Documentation',
      'Sales and Service Tax (SST) Audits',
      'LHDN Dispute Mediation & Mitigation',
      'Tax Incentive Applications (MIDA, MDEC)'
    ],
    education: [
      'Licensed Tax Agent under Section 153 of the Income Tax Act 1967',
      'Chartered Tax Practitioner (CTIM) – Chartered Tax Institute of Malaysia',
      'Member of the Malaysian Institute of Accountants (MIA)',
      'Bachelor of Accounting (Hons), Universiti Malaya'
    ],
    email: 'e.suffian@jeffreysuffian.com.my'
  },
  {
    id: 'kamarul',
    name: 'Kamarul Baharin',
    role: 'Partner, Audit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2zwUubdlX9pnSdhYYj80m4zLgLWArY6DSKVL0mS5ZJhk3ghXdvhqklvew6nLxO0xz0sdhMsMijoccX7XqZQpjDWV_8qCFt96O7J2H4xW_hpTuYVviTCqvw11GSagRkYK5sS5pQsBXv6xBKAjpd80AKb1bS0IPzjVevoTA4JfW0TYy6c2my641ojMqHRwasERV6NdsWmt_4CLYVbYFdzVxxhYS0gNIW0BCnNISNFp1W3bKvzXi9-hVxDClXPD5mmcZTItHaBOzKlRE',
    shortBio: 'Leading audit engagements across manufacturing, trading, and service sectors.',
    longBio: 'Kamarul drives audit engagements across diverse industries including energy, light and heavy manufacturing, consumer merchandise, property development, and high-growth services. Over 18 years, he has designed risk-based audit strategies that satisfy both rigorous statutory governance indices and provide client boards with distinct risk-reduction feedback.',
    specialties: [
      'Institutional Risk-Based Auditing Protocols',
      'MFRS Implementation & Reporting Enhancements',
      'Internal Audit Outsourcing & Advisory',
      'Sovereign Funds / Public Sector Auditing Guidelines'
    ],
    education: [
      'CA – Member of Malaysian Institute of Accountants (MIA)',
      'Member of CPA Australia',
      'Master of Corporate Governance, Universiti Teknologi MARA (UiTM)',
      'Bachelor of Accountancy (Hons), Universiti Teknologi MARA'
    ],
    email: 'k.baharin@jeffreysuffian.com.my'
  }
];

interface PartnerModalProps {
  selectedPartnerId: string | null;
  onClose: () => void;
  onBookPartner: (partnerId: string) => void;
}

export const PartnerDetailModal: React.FC<PartnerModalProps> = ({
  selectedPartnerId,
  onClose,
  onBookPartner
}) => {
  if (!selectedPartnerId) return null;
  const partner = partnersData.find(p => p.id === selectedPartnerId);
  if (!partner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
      <div 
        id="partner-detail-modal"
        className="relative w-full max-w-2xl bg-charcoal border border-white/15 rounded-xl overflow-hidden shadow-2xl animate-in fade-in duration-300"
      >
        {/* Accent top gold line */}
        <div className="h-1 bg-gradient-to-r from-champagne to-goldline w-full" />

        {/* Close Button */}
        <button
          id="close-partner-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ivory/50 hover:text-white rounded-full hover:bg-white/5 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header/Intro */}
        <div className="p-6 pb-4 bg-obsidian border-b border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-champagne/40 shadow-lg flex-shrink-0">
            <img 
              referrerPolicy="no-referrer"
              src={partner.image} 
              alt={partner.name} 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-champagne font-semibold bg-champagne/5 px-2 py-0.5 rounded border border-champagne/10">
              JS Leadership Partner
            </span>
            <h3 className="font-serif text-2xl text-ivory mt-2">{partner.name}</h3>
            <p className="text-champagne/90 text-sm font-medium mt-0.5">{partner.role}</p>
            
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-ivory/60 hover:text-white text-xs font-mono transition-colors">
              <Mail className="w-3.5 h-3.5 text-champagne" />
              <span>{partner.email}</span>
            </div>
          </div>
        </div>

        {/* Body Copy */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 font-mono mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-champagne" /> Biography & Professional Standing
            </h4>
            <p className="text-sm text-ivory/80 leading-relaxed font-light">
              {partner.longBio}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Core Practice Fields */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 font-mono mb-2.5 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-champagne" /> Core Jurisdictions
              </h4>
              <ul className="space-y-1.5 text-xs text-ivory/80 font-light">
                {partner.specialties.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-champagne font-semibold mt-0.5">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications & Academic Credentials */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 font-mono mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-champagne" /> Chartered Credentials
              </h4>
              <ul className="space-y-2 text-xs text-ivory/80 font-light">
                {partner.education.map((edu, i) => (
                  <li key={i} className="flex items-start gap-2 leading-tight">
                    <BookOpen className="w-3.5 h-3.5 text-champagne mt-0.5 flex-shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="p-6 bg-obsidian border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ivory/40">
            For urgent board matters, please contact partner direct.
          </div>
          <button
            id={`book-partner-${partner.id}`}
            onClick={() => {
              onBookPartner(partner.id);
              onClose();
            }}
            className="w-full sm:w-auto bg-champagne hover:bg-goldline text-obsidian px-5 py-2.5 rounded text-xs font-semibold transition-all cursor-pointer"
          >
            Request Engagement with {partner.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
};
