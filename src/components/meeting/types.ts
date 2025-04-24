
export interface MeetingFormData {
  title: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  timeZone: string;
  repeat: string;
  attendees: string[];
  meetingId: "automatic" | "personal";
  description?: string;
}

export interface Attendee {
  email: string;
}
