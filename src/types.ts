export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  longDesc: string;
  deliverables: string[];
  regulationContext: string;
}

export interface Partner {
  id: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
  longBio: string;
  specialties: string[];
  education: string[];
  email: string;
}

export interface ConsultationRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredPartnerId: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed';
  notes?: string;
}

export interface QuestionStep {
  id: number;
  question: string;
  options: {
    label: string;
    points: number;
    value: string;
  }[];
}
