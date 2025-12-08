export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Ancestor {
  name: string;
  role: string;
  desc: string;
  image?: string;
}

export interface Project {
  title: string;
  desc: string;
}
