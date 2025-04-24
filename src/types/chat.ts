
export interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  replyTo?: string;
  replies?: Message[];
  isAudio?: boolean;
}

export interface ChatProps {
  userName: string;
}
