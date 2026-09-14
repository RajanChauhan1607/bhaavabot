export type TabType = 'home' | 'bhaava' | 'rhythm' | 'explore' | 'forest';

export interface GentleReminder {
  title: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  gentleReminder?: GentleReminder;
  timestamp: string;
}

export type SoundType = 'cicadas' | 'rain' | 'ocean' | 'stream' | 'hearth' | 'wind';

export interface SoundTrack {
  id: string;
  title: string;
  subtitle: string;
  type: SoundType;
  duration: number; // in seconds
  iconBg: string;
  iconColor: string;
  description: string;
  recordSubtitle?: string;
}

export interface PostcardItem {
  id: string;
  expNumber: string;
  title: string;
  description: string;
  stampIcon: string;
  stampValue: string;
  stampColor: string;
  image: string;
  ambientType: SoundType;
  storyLines: string[];
  durationMinutes: number;
}

export interface ForestPlant {
  id: string;
  name: string;
  color: string;
  emotion: string;
  plantedAt: string;
  stage: number; // 1: seed, 2: sprout, 3: blooming
}
