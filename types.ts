export enum Sender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
}

export interface Persona {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatarEmoji: string;
  themeColor: string; // Tailwind class mostly
}

export type ChatState = 'idle' | 'searching' | 'connected' | 'error';
