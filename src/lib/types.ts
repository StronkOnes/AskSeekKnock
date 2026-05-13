import type { LucideIcon } from "lucide-react";

export type JournalCategory = 'Reflections' | 'Words' | 'Revelations' | 'Dreams';

export type JournalEntry = {
  id: string;
  category: JournalCategory;
  timestamp: number;
  lastEdited?: number;
  content: string;
};

export type PrayerPoint = {
  title: string;
  duration: number; // in minutes
  text?: string;
};

export type PrayerTemplate = {
  id:string;
  title: string;
  description: string;
  icon: string; // Store icon name as string
  points: PrayerPoint[];
};

export type SermonNote = {
    id: string;
    title: string;
    topic: string;
    timestamp: number;
    content: string;
};

export type ScheduledPrayer = {
  id: string;
  title: string;
  timestamp: number;
  notes?: string;
  participants: string[];
  type: 'weekly group' | 'morning devotion' | 'evening devotion' | 'daily';
};

export type Post = {
  id: string;
  author: string;
  authorImageUrl: string;
  title: string;
  content: string;
  linkUrl?: string;
  category: string;
  createdAt: number;
  comments: Comment[];
};

export type Comment = {
  id: string;
  author: string;
  authorImageUrl: string;
  content: string;
  createdAt: number;
};

export type BlogEntry = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
  excerpt?: string;
};
