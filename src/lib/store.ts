// Shared data store using localStorage for persistence

export interface Leader {
  id: string;
  name: string;
  role: string;
  course: string;
  phone: string;
  email: string;
  image: string;
  quote: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  joinedDate: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  time: string;
  location: string;
  description: string;
  image?: string; // Optional banner/card image URL
  isRecurring: boolean;
  recurringPattern?: string; // e.g., "Every Sunday", "Last Friday of Month"
}

// Default data
import violinPerformance from "@/assets/gallery/violin-performance.jpg";
import orchestraConductor from "@/assets/gallery/orchestra-conductor.jpg";
import fullOrchestra from "@/assets/gallery/full-orchestra.jpg";
import congregation from "@/assets/gallery/congregation.jpg";
import saxophoneDuo from "@/assets/gallery/saxophone-duo.jpg";
import brassSection from "@/assets/gallery/brass-section.jpg";
import trumpetPlayers from "@/assets/gallery/trumpet-players.jpg";
import flutePlayers from "@/assets/gallery/flute-players.jpg";
import keyboardPlayers from "@/assets/gallery/keyboard-players.jpg";
import outdoorService from "@/assets/gallery/outdoor-service.jpg";
import outdoorViolins from "@/assets/gallery/outdoor-violins.jpg";
import groupPhoto from "@/assets/gallery/group-photo.jpg";
import fellowshipMeeting from "@/assets/gallery/fellowship-meeting.jpg";

export const defaultLeaders: Leader[] = [];

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: "1",
    src: violinPerformance,
    title: "Violin Performance",
    description: "Violinists performing during a special service",
    category: "Music Ministry",
  },
  {
    id: "2",
    src: orchestraConductor,
    title: "Orchestra Worship",
    description: "The full orchestra led by our conductor in praise",
    category: "Music Ministry",
  },
  {
    id: "3",
    src: fullOrchestra,
    title: "Full Orchestra Performance",
    description: "Our complete orchestra performing together",
    category: "Music Ministry",
  },
  {
    id: "4",
    src: congregation,
    title: "Congregation in Worship",
    description: "Our congregation lifting their hands in worship",
    category: "Worship",
  },
  {
    id: "5",
    src: saxophoneDuo,
    title: "Saxophone Section",
    description: "Our talented saxophonists during a performance",
    category: "Music Ministry",
  },
  {
    id: "6",
    src: brassSection,
    title: "Brass Section",
    description: "Saxophone and trumpet players leading worship",
    category: "Music Ministry",
  },
  {
    id: "7",
    src: trumpetPlayers,
    title: "Trumpet Players",
    description: "Our trumpet players glorifying God through music",
    category: "Music Ministry",
  },
  {
    id: "8",
    src: flutePlayers,
    title: "Flute Section",
    description: "Flutists performing during a special service",
    category: "Music Ministry",
  },
  {
    id: "9",
    src: keyboardPlayers,
    title: "Keyboard Players",
    description: "Our talented keyboardists leading worship",
    category: "Music Ministry",
  },
  {
    id: "10",
    src: outdoorService,
    title: "Outdoor Service",
    description: "Fellowship gathering for an outdoor worship service",
    category: "Fellowship",
  },
  {
    id: "11",
    src: outdoorViolins,
    title: "Outdoor Violin Performance",
    description: "Violinists playing during outdoor worship",
    category: "Music Ministry",
  },
  {
    id: "12",
    src: groupPhoto,
    title: "Fellowship Group Photo",
    description: "Our fellowship family united together",
    category: "Fellowship",
  },
  {
    id: "13",
    src: fellowshipMeeting,
    title: "Fellowship Meeting",
    description: "Members gathering for fellowship and discussion",
    category: "Fellowship",
  },
];

export const defaultMembers: Member[] = [];

// Helper to get the next occurrence of a day
const getNextDayOccurrence = (dayOfWeek: number): string => {
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntil = (dayOfWeek - currentDay + 7) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + (daysUntil === 0 ? 0 : daysUntil));
  return nextDate.toISOString().split("T")[0];
};

// Get last Friday of current month
const getLastFridayOfMonth = (): string => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const dayOfWeek = lastDay.getDay();
  const diff = (dayOfWeek + 2) % 7;
  lastDay.setDate(lastDay.getDate() - diff);
  return lastDay.toISOString().split("T")[0];
};

export const defaultEvents: Event[] = [];

// Storage keys
const LEADERS_KEY = "rh_leaders";
const GALLERY_KEY = "rh_gallery";
const MEMBERS_KEY = "rh_members";
const EVENTS_KEY = "rh_events";

// Leaders
export const getLeaders = (): Leader[] => {
  const stored = localStorage.getItem(LEADERS_KEY);
  return stored ? JSON.parse(stored) : defaultLeaders;
};

export const saveLeaders = (leaders: Leader[]) => {
  localStorage.setItem(LEADERS_KEY, JSON.stringify(leaders));
};

// Gallery
export const getGalleryImages = (): GalleryImage[] => {
  const stored = localStorage.getItem(GALLERY_KEY);
  return stored ? JSON.parse(stored) : defaultGalleryImages;
};

export const saveGalleryImages = (images: GalleryImage[]) => {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
};

// Members
export const getMembers = (): Member[] => {
  const stored = localStorage.getItem(MEMBERS_KEY);
  return stored ? JSON.parse(stored) : defaultMembers;
};

export const saveMembers = (members: Member[]) => {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
};

// Events
export const getEvents = (): Event[] => {
  const stored = localStorage.getItem(EVENTS_KEY);
  return stored ? JSON.parse(stored) : defaultEvents;
};

export const saveEvents = (events: Event[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};
