export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isBookingTrigger?: boolean;
}

export interface BookingInquiry {
  id?: string;
  dogName?: string;
  breed?: string;
  service?: string;
  customerName?: string;
  customerEmail?: string;
  phone?: string;
  notes?: string;
  time?: string;
  status?: string;
  dateCreated?: string;
}

export interface QuoteInquiry {
  id?: string;
  fullName: string;
  contactMethod: string;
  town?: string;
  services?: string;
  jobDescription?: string;
  preferredTime?: string;
  status?: string;
  dateCreated?: string;
}
