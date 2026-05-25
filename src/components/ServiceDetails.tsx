import React from 'react';
import { FileText, CircleDollarSign, TrendingUp, ShieldCheck, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'audit',
    title: 'Statutory Audit',
    shortDesc: 'Independent assurance services delivering credibility to your financial statements for stakeholders and regulatory bodies.',
    icon: 'audit',
    longDesc: 'Our statutory audit services provide meticulous, independent reviews of your financial statements. We ensure your reporting meets all Malaysian Financial Reporting Standards (MFRS), International Financial Reporting Standards (IFRS), and the companies Act 2016 requirements. We approach each audit not just as a compliance check, but as an opportunity to provide valuable operational insights.',
    deliverables: [
      'Independent Audit Report & Financial Statements certification',
      'Management Letter detailing internal control observations and enhancements',
      'Audit Committee briefings on critical accounting estimates and risks',
      'Evaluation of accounting policy compliance with MFRS / IFRS rules'
    ],
    regulationContext: 'As an approved Audit Firm registered with the Malaysian Institute of Accountants (MIA), our procedures rigorously conform to the International Standards on Auditing (ISA).'
  },
  {
    id: 'tax',
    title: 'Tax Compliance & Advisory',
    shortDesc: 'Comprehensive corporate tax filing, strategic planning, and structured advisory to optimize tax efficiency while ensuring strict compliance.',
    icon: 'tax',
    longDesc: 'Malaysian tax regulations are complex and subject to continuous developments. We collaborate with you to structure business activities efficiently, manage corporate income tax, Indirect Tax (SST), and address transfer pricing realities. Our active planning mitigates tax risks while maximizing legally available incentives and allowances.',
    deliverables: [
      'Corporate Tax Return Preparation & Filing (Form C)',
      'Strategic Tax Planning & restructuring advisory',
      'SST reviews, compliance reporting, and advisory support',
      'Transfer Pricing Documentation & policy reviews',
      'Representation during Inland Revenue Board (LHDN) audits'
    ],
    regulationContext: 'Registered Tax Agency authorized under Section 153 of the Income Tax Act 1967. Our team maintains real-time coordination with LHDN regulations.'
  },
  {
    id: 'advisory',
    title: 'Business Advisory',
    shortDesc: 'Strategic guidance for corporate restructuring, operational process refinement, and risk management systems to enhance resilience.',
    icon: 'advisory',
    longDesc: 'We guide corporations through pivotal milestones—whether seeking expansion, managing restructuring, or enhancing internal controls. Our advisory practice blends deep financial modeling with commercial pragmatism to prepare your business for institutional investment, debt restructuring, or joint ventures.',
    deliverables: [
      'Financial Due Diligence & Valuation models',
      'Corporate Restructuring and entity simplification strategies',
      'Internal Control Assessments & Risk Management Frameworks',
      'SOP advisory & Performance Optimization reports',
      'Feasibility studies for major industrial capitals'
    ],
    regulationContext: 'Aligned with board-level requirements for corporate governance best practices defined in the Malaysian Code on Corporate Governance (MCCG).'
  }
];

interface ServiceDetailsProps {
  selectedServiceId: string | null;
  onClose: () => void;
  onSelectConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsProps> = ({
  selectedServiceId,
  onClose,
  onSelectConsultation
}) => {
  if (!selectedServiceId) return null;
  const service = servicesData.find(s => s.id === selectedServiceId);
  if (!service) return null;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'audit':
        return <FileText className="w-8 h-8 text-champagne" />;
      case 'tax':
        return <CircleDollarSign className="w-8 h-8 text-champagne" />;
      case 'advisory':
        return <TrendingUp className="w-8 h-8 text-champagne" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-champagne" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md">
      <div 
        id="service-detail-modal"
        className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in duration-300"
      >
        {/* Accent Top border */}
        <div className="h-1 text-gradient-gold bg-gradient-to-r from-champagne to-goldline w-full" />
        
        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              {renderIcon(service.icon)}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold font-mono">
                Practice Area Details
              </span>
              <h3 className="font-serif text-2xl text-ivory mt-0.5">{service.title}</h3>
            </div>
          </div>
          <button 
            id="close-service-modal"
            onClick={onClose}
            className="p-2 text-ivory/50 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main overview */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 font-mono mb-2">Practice Overview</h4>
            <p className="text-sm text-ivory/80 leading-relaxed font-light">
              {service.longDesc}
            </p>
          </div>

          {/* Deliverables / Scope */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/50 font-mono mb-3">Key Solutions & Deliverables</h4>
            <div className="grid gap-2">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start bg-white/5 p-3 rounded-lg border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-champagne mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-xs text-ivory/90 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulation & Authority context */}
          <div className="p-4 bg-navy/60 rounded-lg border border-champagne/10">
            <h5 className="text-[10px] uppercase tracking-widest text-champagne font-semibold font-mono mb-1">
              Regulatory Framework & Authority
            </h5>
            <p className="text-xs text-ivory/60 leading-relaxed italic">
              {service.regulationContext}
            </p>
          </div>
        </div>

        {/* Action footer */}
        <div className="p-6 bg-obsidian border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-ivory/50">
            Partner oversight applies to all corporate projects.
          </div>
          <button
            id={`book-service-${service.id}`}
            onClick={() => {
              onSelectConsultation(service.title);
              onClose();
            }}
            className="w-full sm:w-auto bg-champagne hover:bg-goldline text-obsidian px-5 py-2.5 rounded text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
          >
            Request consultation for {service.title}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
