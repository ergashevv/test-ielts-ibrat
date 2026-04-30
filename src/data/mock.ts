import { Course, Promo, User, SettingToggle } from "@/types";

export const mockUser: User = {
  id: "1",
  fullName: "Dilshod Mirzaev",
  email: "dilshod@example.com",
  avatarUrl: "/Avatar.svg",
  phone: "+998 90 123 45 67"
};

// Staging practicum IDs (Postman audit 2026-04-30). Used as mock fallback;
// production reads dynamic IDs via `coursesService.list()` → `/practicums/public`.
export const mockCourses: Course[] = [
  {
    id: "reading",
    title: "Reading",
    description: "Master IELTS Reading section",
    icon: "/reading.svg",
    image: "/reading-thumb.jpg",
    theme: "blue",
    backgroundColor: "#E9F2FF",
    progress: 100,
    unitCount: 12,
    practicumId: "6968e921e3bc8164457e440e",
  },
  {
    id: "listening",
    title: "Listening",
    description: "Improve your hearing skills",
    icon: "/listening.svg",
    image: "/listening-thumb.jpg",
    theme: "purple",
    backgroundColor: "#F5F0FD",
    progress: 40,
    unitCount: 12,
    practicumId: "6968e98176137105c9dcf926",
  },
  {
    id: "writing",
    title: "Writing",
    description: "Improve your IELTS Writing skills",
    icon: "/writing.svg",
    image: "/writing-thumb.jpg",
    theme: "red",
    backgroundColor: "#FFEEE9",
    progress: 0,
    unitCount: 12,
    practicumId: "6968e9e476137105c9dcf934",
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Practice your speaking fluency",
    icon: "/speaking.svg",
    image: "/speaking-thumb.jpg",
    theme: "green",
    backgroundColor: "#EEF8EC",
    progress: 0,
    unitCount: 12,
    practicumId: "6968ea30e3bc8164457e4423",
  }
];


export const mockPromos: Promo[] = [
  {
    id: "1",
    title: "Special discount for International Language Day",
    description: "We offer you a 21% discount on the occasion of the International Language Day",
    cta: "/premium",
    ctaLabel: "Use",
    image: "/promo-card-image.png"
  }
];

export const mockSettings: SettingToggle[] = [
  { id: "notifications", label: "Push Notifications", enabled: true, description: "Get notified about upcoming lessons" },
  { id: "email", label: "Email Updates", enabled: false, description: "Receive weekly progress reports" },
  { id: "dark_mode", label: "Dark Mode", enabled: false, description: "Switch to dark theme" },
  { id: "auto_play", label: "Auto Play", enabled: true, description: "Automatically start next lesson" }
];
