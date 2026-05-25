import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Shield, Send, CheckCircle2, User, Building, Phone, Mail, FileText, ChevronRight, ListCollapse } from 'lucide-react';
import { ConsultationRequest } from '../types';
import { partnersData } from './LeadProfiles';

interface ConsultationFormProps {
  initialServiceType?: string;
  initialPartnerId?: string;
  onSuccess?: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialServiceType = '',
  initialPartnerId = '',
  onSuccess
}) => {
  // Local state for storing list of requests
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [showMyBookings, setShowMyBookings] = useState(false);

  // Load from local storage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('js_consultations');
    if (saved) {
      try {
        setRequests(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse booked consultations', e);
      }
    }
  }, []);

  // Form Fields State
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState(initialServiceType || 'Statutory Audit');
  const [preferredPartnerId, setPreferredPartnerId] = useState(initialPartnerId || 'any');
  const [notes, setNotes] = useState('');

  // Custom visual calendar states
  // We align with the current time of May 25, 2026
  const [selectedDay, setSelectedDay] = useState<number>(27); // Default to a day soon
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 AM');
  
  // Submit state
  const [submittedRequest, setSubmittedRequest] = useState<ConsultationRequest | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Update selection if prop changes
  useEffect(() => {
    if (initialServiceType) {
      setServiceType(initialServiceType);
    }
  }, [initialServiceType]);

  useEffect(() => {
    if (initialPartnerId) {
      setPreferredPartnerId(initialPartnerId);
    }
  }, [initialPartnerId]);

  // Mock Days matching late May / Early June 2026
  const availableDays = [
    { date: '2026-05-26', label: 'Tue', num: 26, month: 'May' },
    { date: '2026-05-27', label: 'Wed', num: 27, month: 'May' },
    { date: '2026-05-28', label: 'Thu', num: 28, month: 'May' },
    { date: '2026-05-29', label: 'Fri', num: 29, month: 'May' },
    { date: '2026-06-01', label: 'Mon', num: 1, month: 'Jun' },
    { date: '2026-06-02', label: 'Tue', num: 2, month: 'Jun' },
    { date: '2026-06-03', label: 'Wed', num: 3, month: 'Jun' },
  ];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM'
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!companyName.trim()) {
      setErrorMsg('Company Name is required.');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMsg('Contact person is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('A valid corporate email is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Contact phone number is required.');
      return;
    }

    const selectedDayData = availableDays.find(d => d.num === selectedDay);
    const dateStr = selectedDayData ? `${selectedDayData.num} ${selectedDayData.month} 2026` : '27 May 2026';

    const newRequest: ConsultationRequest = {
      id: 'REQ-' + Math.floor(Math.random() * 900000 + 100000),
      companyName,
      contactPerson,
      email,
      phone,
      serviceType,
      preferredPartnerId,
      date: dateStr,
      timeSlot: selectedTimeSlot,
      status: 'Confirmed', // Instant auto-confirmed for premium feel
      notes
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    localStorage.setItem('js_consultations', JSON.stringify(updated));
    setSubmittedRequest(newRequest);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleResetForm = () => {
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setNotes('');
    setSubmittedRequest(null);
  };

  const selectedPartner = partnersData.find(p => p.id === preferredPartnerId);

  return (
    <div id="consultation-section-container" className="w-full">
      {submittedRequest ? (
        /* SUCCESS RECEIPT VIEW */
        <div 
          id="consultation-receipt-box"
          className="bg-charcoal border border-champagne/30 p-8 rounded-xl text-ivory max-w-xl mx-auto shadow-2xl animate-in zoom-in-95 duration-300"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 bg-champagne/10 border border-champagne/50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-champagne" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-champagne font-mono font-semibold">
              Corporate Consultation Booked
            </span>
            <h3 className="font-serif text-2xl mt-1 text-ivory">Session Reserved</h3>
            <p className="text-xs text-ivory/60 mt-2 max-w-sm">
              We have reserved a partner review slot for your organization. A confirmation email has been dispatched to {submittedRequest.email}.
            </p>
          </div>

          <div className="bg-obsidian/60 border border-white/5 p-4 rounded-lg space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Reference ID:</span>
              <span className="font-mono text-champagne font-semibold">{submittedRequest.id}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Company:</span>
              <span className="font-medium text-right">{submittedRequest.companyName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Contact:</span>
              <span className="font-medium">{submittedRequest.contactPerson}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Service Area:</span>
              <span className="text-champagne font-medium">{submittedRequest.serviceType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Assigned Partner:</span>
              <span className="font-medium">
                {selectedPartner ? selectedPartner.name : 'Senior Advisory Desk'}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-ivory/50">Date:</span>
              <span className="font-medium">{submittedRequest.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory/50">Confirmed Time:</span>
              <span className="font-mono text-champagne font-semibold">{submittedRequest.timeSlot} (GMT+8)</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              id="request-another-session-button"
              onClick={handleResetForm}
              className="flex-1 bg-champagne hover:bg-goldline text-obsidian py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Request Another Session
            </button>
            <button
              id="view-bookings-tab-button"
              onClick={() => {
                setShowMyBookings(true);
                setSubmittedRequest(null);
              }}
              className="flex-1 bg-white/5 hover:bg-white/10 text-ivory border border-white/10 py-3 rounded text-xs transition-all cursor-pointer"
            >
              View My Reservatons ({requests.length})
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-ivory/40">
            <Shield className="w-3.5 h-3.5 text-champagne" />
            <span>MIA Standards & confidentiality Protocols Apply</span>
          </div>
        </div>
      ) : showMyBookings ? (
        /* MY BOOKINGS LIST VIEW */
        <div 
          id="my-bookings-list-view"
          className="bg-charcoal border border-white/10 p-6 rounded-xl text-ivory max-w-xl mx-auto shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-serif text-xl text-ivory">Registered Consultations</h3>
              <p className="text-xs text-ivory/50">Stored locally on your interface</p>
            </div>
            <button
              id="back-to-booking-button"
              onClick={() => setShowMyBookings(false)}
              className="text-xs text-champagne hover:underline transition-all"
            >
              + Back to Booking Form
            </button>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-lg">
              <Calendar className="w-8 h-8 text-ivory/20 mx-auto mb-3" />
              <p className="text-xs text-ivory/40">No consultations logged on this device.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {requests.map((req) => (
                <div key={req.id} className="bg-obsidian/80 p-4 border border-white/5 rounded-lg space-y-2 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded">
                        {req.id}
                      </span>
                      <h4 className="font-serif text-base text-ivory mt-1.5">{req.companyName}</h4>
                    </div>
                    <span className="text-[10px] bg-green-950/50 text-green-400 border border-green-900 px-2 py-0.5 rounded">
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5 text-ivory/60">
                    <div>
                      <span className="block text-[10px] text-ivory/40">Representative</span>
                      <span className="text-ivory/90 font-light">{req.contactPerson}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-ivory/40">Practice Area</span>
                      <span className="text-champagne font-medium">{req.serviceType}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-ivory/40">Allocated Board Time</span>
                      <span className="text-ivory/90 font-light">{req.date} at {req.timeSlot}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-ivory/40">Assigned Expert</span>
                      <span className="text-ivory/90 font-light">
                        {req.preferredPartnerId === 'any' ? 'Senior Advisory Committee' : partnersData.find(p => p.id === req.preferredPartnerId)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between items-center text-xs text-ivory/40 border-t border-white/5 pt-4">
            <span>Requires cancellation 24h prior.</span>
            <button
              id="clear-bookings-storage-btn"
              onClick={() => {
                if (confirm('Are you sure you want to clear your local consultation logs?')) {
                  localStorage.removeItem('js_consultations');
                  setRequests([]);
                }
              }}
              className="text-red-400/80 hover:text-red-400 text-xs transition-colors"
            >
              Clear Logs
            </button>
          </div>
        </div>
      ) : (
        /* STANDARD INPUT FORM VIEW */
        <form 
          id="consultation-booking-form"
          onSubmit={handleBookSubmit} 
          className="bg-charcoal border border-white/10 p-8 rounded-xl text-ivory max-w-2xl mx-auto shadow-2xl space-y-6"
        >
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl text-ivory">Book Board Consultation</h3>
            <p className="text-xs text-ivory/50 mt-1">
              Select your required corporate practice sector, direct partner, and preferred timeline.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-950/50 border border-red-500/30 text-red-200 text-xs p-3 rounded-lg text-center">
              {errorMsg}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column: Form Fields */}
            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Company / Organization Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <input
                    id="input-company-name"
                    type="text"
                    required
                    placeholder="E.g., Suffian Holdings Sdn Bhd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
              </div>

              {/* Representative Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Contact Person *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <input
                    id="input-representative-name"
                    type="text"
                    required
                    placeholder="E.g., Datuk Eddy Suffian"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Corporate Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <input
                    id="input-corporate-email"
                    type="email"
                    required
                    placeholder="corporate@domain.com.my"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Malaysian Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <input
                    id="input-corporate-phone"
                    type="tel"
                    required
                    placeholder="E.g., +60 12-345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Practice / Leadership Allocations */}
            <div className="space-y-4">
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Required Competency Sector
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <select
                    id="select-competency-sector"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory focus:outline-none focus:border-champagne transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Statutory Audit">Statutory Audit & Assurance</option>
                    <option value="Tax Compliance">Corporate Tax Compliance</option>
                    <option value="Tax Planning & Structuring">Tax Structuring & Planning</option>
                    <option value="Business Advisory">Corporate Advisory & SOPs</option>
                    <option value="Corporate Finance">M&A / Corporate Finance</option>
                  </select>
                </div>
              </div>

              {/* Partner selection */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Preferred Presiding Partner
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-champagne" />
                  <select
                    id="select-presiding-partner"
                    value={preferredPartnerId}
                    onChange={(e) => setPreferredPartnerId(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-obsidian border border-white/10 rounded text-sm text-ivory focus:outline-none focus:border-champagne transition-colors appearance-none cursor-pointer"
                  >
                    <option value="any">First Available Advisory Board Partner</option>
                    {partnersData.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.role.split(',')[0]})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consultation Notes */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-ivory/60 font-mono mb-1.5 font-semibold">
                  Brief Agenda / Board concerns
                </label>
                <textarea
                  id="textarea-corporate-agenda"
                  rows={3}
                  placeholder="E.g., upcoming joint-venture restructuring, transfer pricing advisory, or voluntary statutory audit requirement."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-obsidian border border-white/10 rounded text-xs text-ivory placeholder-ivory/30 focus:outline-none focus:border-champagne transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Interactive Custom Calendar Row */}
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <label className="text-xs uppercase tracking-widest text-ivory/60 font-mono font-semibold block">
                Select Consultation Date & Slot (Late May / Early June 2026)
              </label>
              <div className="flex items-center gap-1.5 text-[10px] text-champagne/80 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Default timezone: Kuala Lumpur GMT+8</span>
              </div>
            </div>

            {/* Custom visual calendar row */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {availableDays.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  id={`day-select-${d.num}`}
                  onClick={() => setSelectedDay(d.num)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    selectedDay === d.num
                      ? 'bg-champagne border-champagne text-obsidian font-bold shadow-md shadow-champagne/10'
                      : 'bg-obsidian hover:bg-white/5 border-white/5 text-ivory/90'
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-60 font-mono leading-none">
                    {d.label}
                  </span>
                  <span className="block text-sm font-serif mt-1 font-semibold">
                    {d.num}
                  </span>
                  <span className="block text-[8px] font-mono tracking-widest opacity-40 leading-none mt-1">
                    {d.month}
                  </span>
                </button>
              ))}
            </div>

            {/* Time Slot Buttons */}
            <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  id={`timeslot-${slot.replace(':', '').replace(' ', '')}`}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`px-4 py-2 rounded text-xs transition-all cursor-pointer border ${
                    selectedTimeSlot === slot
                      ? 'bg-white/10 border-champagne text-champagne font-semibold font-mono'
                      : 'bg-obsidian/40 hover:bg-white/5 border-white/5 text-ivory/60 font-mono'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Submission and Bottom Link Row */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {requests.length > 0 ? (
              <button
                type="button"
                id="view-saved-bookings-btn"
                onClick={() => setShowMyBookings(true)}
                className="text-xs text-champagne/90 hover:text-champagne flex items-center gap-1 hover:underline transition-all cursor-pointer"
              >
                <ListCollapse className="w-4 h-4" />
                <span>My Active Reservations ({requests.length})</span>
              </button>
            ) : (
              <div className="text-[11px] text-ivory/40 flex items-center gap-1.5 max-w-sm">
                <Shield className="w-4 h-4 text-champagne" />
                <span>Strict statutory data protection guarantees apply to all form data.</span>
              </div>
            )}

            <button
              type="submit"
              id="submit-consultation-btn"
              className="w-full sm:w-auto bg-champagne hover:bg-goldline text-obsidian px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all shadow-lg shadow-champagne/10 cursor-pointer"
            >
              <span>Submit Secure Reservation</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
