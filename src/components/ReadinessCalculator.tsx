import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, Calculator, ChevronRight, CheckCircle2, RotateCcw, AlertTriangle, Scale, Award, ArrowUpRight } from 'lucide-react';

interface ReadinessCalculatorProps {
  onPreloadConsultation: (service: string) => void;
}

export const ReadinessCalculator: React.FC<ReadinessCalculatorProps> = ({
  onPreloadConsultation
}) => {
  const [step, setStep] = useState(1);
  const [revenue, setRevenue] = useState('1m-10m');
  const [industry, setIndustry] = useState('services');
  const [bookkeeping, setBookkeeping] = useState('clean');
  const [scope, setScope] = useState('audit-tax');

  const handleReset = () => {
    setStep(1);
    setRevenue('1m-10m');
    setIndustry('services');
    setBookkeeping('clean');
    setScope('audit-tax');
  };

  // Logic to calculate estimated readiness, auditing hours, and recommended path
  const evaluateResults = () => {
    let score = 90;
    let baseHours = 40;
    let docsNeeded: string[] = [
      'Final Trial Balance & General Ledger exports',
      'Audited Financial statements from preceding financial year',
      'Bank Reconciliation statements for all corporate accounts',
    ];

    // Deducts or adds depending on current bookkeeping state
    if (bookkeeping === 'manual') {
      score -= 25;
      baseHours += 20;
      docsNeeded.push('Physical invoice ledger matched against bank transcripts');
    } else if (bookkeeping === 'unreconciled') {
      score -= 50;
      baseHours += 50;
      docsNeeded.push('Historical transaction listings & comprehensive ledger restructuring audits');
    }

    // Adjusting based on scale
    if (revenue === 'less-1m') {
      baseHours *= 0.7;
    } else if (revenue === '10m-50m') {
      baseHours *= 1.5;
      docsNeeded.push('Complete Stock Physical count protocols & Valuation records');
    } else if (revenue === 'over-50m') {
      baseHours *= 2.5;
      docsNeeded.push('Fixed Assets Register detailed reconciliation file', 'MFRS 16 lease liability computations');
    }

    // Industry additions
    if (industry === 'property') {
      docsNeeded.push('Project progress certifications & Developer account ledgers');
    } else if (industry === 'manufacturing') {
      docsNeeded.push('Raw material work-in-progress (WIP) valuation audits');
    }

    // Recommended leader & service preloads
    let leader = 'Jeffrey Bosra';
    let serviceTypeSelected = 'Statutory Audit';
    
    if (scope === 'audit-only') {
      leader = 'Kamarul Baharin';
      serviceTypeSelected = 'Statutory Audit';
    } else if (scope === 'full') {
      leader = 'Jeffrey Bosra';
      serviceTypeSelected = 'Business Advisory';
    } else {
      leader = 'Eddy Suffian Yusof';
      serviceTypeSelected = 'Tax Compliance';
    }

    return {
      score: Math.max(20, score),
      estimatedHours: Math.round(baseHours),
      documents: docsNeeded,
      recommendedLeader: leader,
      serviceTypeSelected,
      complexity: score >= 80 ? 'Standard Complexity / Highly Prepared' : score >= 50 ? 'Medium Complexity' : 'Significant Reconciliations Required'
    };
  };

  const results = evaluateResults();

  return (
    <div id="readiness-calculator-card" className="bg-charcoal border border-white/10 p-6 md:p-8 rounded-xl text-ivory max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-champagne/10 rounded border border-champagne/30">
          <Calculator className="w-5 h-5 text-champagne" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-ivory">Compliance Readiness & Hours Estimator</h3>
          <p className="text-xs text-ivory/50">Determine audit preparation state and Malaysian filing requirements</p>
        </div>
      </div>

      {step <= 4 ? (
        /* ACTIVE QUESTION WORKFLOW */
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-champagne">
            <span>Corporate Sector Assessment</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              style={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-gradient-to-r from-champagne to-goldline transition-all duration-300"
            />
          </div>

          {/* Question 1: Revenue scale */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-sm font-sans font-medium text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-champagne" /> What is your organization’s current Annual Corporate Revenue?
              </h4>
              <div className="grid gap-3">
                {[
                  { value: 'less-1m', label: 'Under RM 1.0 Million', desc: 'SME / Microenterprise filing thresholds' },
                  { value: '1m-10m', label: 'RM 1.0 Million – RM 10.0 Million', desc: 'Standard private limited auditing thresholds' },
                  { value: '10m-50m', label: 'RM 10.0 Million – RM 50.0 Million', desc: 'Medium scale enterprise reporting metrics' },
                  { value: 'over-50m', label: 'Over RM 50.0 Million', desc: 'High-volume or public sector requirements' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`rev-opt-${opt.value}`}
                    onClick={() => { setRevenue(opt.value); setStep(2); }}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      revenue === opt.value 
                        ? 'bg-white/5 border-champagne text-champagne ring-1 ring-champagne' 
                        : 'bg-obsidian/60 hover:bg-white/5 border-white/5 text-ivory/80'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[10px] text-ivory/40 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Industry */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-sm font-sans font-medium text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-champagne" /> What is your primary Industry Group?
              </h4>
              <div className="grid gap-3">
                {[
                  { value: 'services', label: 'Professional Services & Digital Tech', desc: 'Asset-light, digital reporting emphasis' },
                  { value: 'manufacturing', label: 'Manufacturing & Heavy Industrial', desc: 'High inventory valuation and overhead allocation audits' },
                  { value: 'retail', label: 'Retail, Distribution & General Trading', desc: 'Extensive transaction ledgers and cashflow reconciliations' },
                  { value: 'property', label: 'Property Development & Infrastructure', desc: 'MFRS 15 revenue recognition on contracts applies' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`ind-opt-${opt.value}`}
                    onClick={() => { setIndustry(opt.value); setStep(3); }}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      industry === opt.value 
                        ? 'bg-white/5 border-champagne text-champagne ring-1 ring-champagne' 
                        : 'bg-obsidian/60 hover:bg-white/5 border-white/5 text-ivory/80'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[10px] text-ivory/40 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Bookkeeping preparation */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-sm font-sans font-medium text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-champagne" /> How is your current financial general ledger organized?
              </h4>
              <div className="grid gap-3">
                {[
                  { value: 'clean', label: 'Reconciled inside secure cloud systems', desc: 'Real-time exports, matching banks, orderly ledgers (Xero, SQL, etc)' },
                  { value: 'manual', label: 'Offline spreadsheets & manual balancing', desc: 'Reconciled balance sheets but require offline compilation checks' },
                  { value: 'unreconciled', label: 'Currently un-reconciled ledgers', desc: 'Multiple missing statements or backlog bookkeeping needed first' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`book-opt-${opt.value}`}
                    onClick={() => { setBookkeeping(opt.value); setStep(4); }}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      bookkeeping === opt.value 
                        ? 'bg-white/5 border-champagne text-champagne ring-1 ring-champagne' 
                        : 'bg-obsidian/60 hover:bg-white/5 border-white/5 text-ivory/80'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[10px] text-ivory/40 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Scope of engagement */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-sm font-sans font-medium text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-champagne" /> Select required professional advisory scope:
              </h4>
              <div className="grid gap-3">
                {[
                  { value: 'audit-only', label: 'Statutory Board Audit Only', desc: 'Independent oversight and regulatory filing credentials' },
                  { value: 'audit-tax', label: 'Statutory Audit + Annual Tax Compliance packages', desc: 'Optimized corporate compliance workflow combo' },
                  { value: 'full', label: 'Full Institutional Advisory', desc: 'Ongoing business SOP advisory, corporate finance analysis & tax planning' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`scope-opt-${opt.value}`}
                    onClick={() => { setScope(opt.value); setStep(5); }}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      scope === opt.value 
                        ? 'bg-white/5 border-champagne text-champagne ring-1 ring-champagne' 
                        : 'bg-obsidian/60 hover:bg-white/5 border-white/5 text-ivory/80'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[10px] text-ivory/40 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center text-xs pt-4 border-t border-white/5">
            {step > 1 ? (
              <button
                type="button"
                id="prev-step-button"
                onClick={() => setStep(step - 1)}
                className="text-ivory/50 hover:text-white px-3 py-1.5 rounded hover:bg-white/5 transition-all text-xs font-medium"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <span className="text-[10px] text-ivory/30">MIA Member Firm AF001963 Compliance Support</span>
          </div>
        </div>
      ) : (
        /* RESULTS INTERACTION BOARD */
        <div className="space-y-6 animate-in zoom-in-95 duration-200 text-left">
          {/* Header Metric blocks */}
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Readiness Index */}
            <div className="bg-obsidian/80 p-4 border border-white/5 rounded-lg text-center">
              <span className="block text-[9px] uppercase tracking-widest text-white/50 font-mono mb-1">
                Readiness Score
              </span>
              <span className={`text-3xl font-serif font-bold ${
                results.score >= 80 ? 'text-green-400' : results.score >= 50 ? 'text-orange-300' : 'text-red-400'
              }`}>
                {results.score}%
              </span>
              <span className="block text-[10px] text-ivory/50 mt-1">{results.complexity}</span>
            </div>

            {/* Estimated Partner Hours */}
            <div className="bg-obsidian/80 p-4 border border-white/5 rounded-lg text-center">
              <span className="block text-[9px] uppercase tracking-widest text-white/50 font-mono mb-1">
                Estimated Audit Hours
              </span>
              <span className="text-3xl font-serif font-bold text-champagne">
                ~{results.estimatedHours}h
              </span>
              <span className="block text-[10px] text-ivory/50 mt-1">Direct Partner oversight</span>
            </div>

            {/* Recommended Lead Partner */}
            <div className="bg-obsidian/80 p-4 border border-white/5 rounded-lg text-center">
              <span className="block text-[9px] uppercase tracking-widest text-white/50 font-mono mb-1">
                Recommended Expert
              </span>
              <span className="text-sm font-serif font-semibold text-white block mt-2">
                {results.recommendedLeader}
              </span>
              <span className="block text-[9px] text-champagne mt-1">Board Specialty Match</span>
            </div>
          </div>

          {/* Alert for low readiness score */}
          {results.score < 50 && (
            <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-lg flex items-start text-xs text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-400 mr-2.5 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Notice:</strong> Your readiness indices point to unreconciled ledgers. We recommend utilizing our corporate advisory desk early to structure balancing sheets in compliance with Companies Act statutory norms.
              </p>
            </div>
          )}

          {/* Tailored checklist documentation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ivory/60 font-mono font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-champagne" /> Required Compliance documentation:
            </h4>
            <div className="grid md:grid-cols-2 gap-2 text-xs">
              {results.documents.map((doc, idx) => (
                <div key={idx} className="flex items-start bg-obsidian/50 p-2.5 border border-white/5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-champagne mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-ivory/90 font-light text-[11px] leading-tight">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to actions */}
          <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row gap-3">
            <button
              id="reset-calculator-btn"
              onClick={handleReset}
              className="px-4 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded text-xs font-semibold flex items-center justify-center gap-1.5 text-ivory/70 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset parameters</span>
            </button>
            <button
              id="calculator-book-action-btn"
              onClick={() => {
                onPreloadConsultation(results.serviceTypeSelected);
                // Scroll page down smoothly to consultation visual panel
                const target = document.getElementById('secure-reservation-panel');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex-1 bg-champagne hover:bg-goldline text-obsidian px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-champagne/15 cursor-pointer"
            >
              <span>Apply & Request Consultation slots</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
