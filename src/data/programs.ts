export interface Program {
  id: string;
  name: string;
  ageGroup: string;
  category: string;
  schedule: string;
  startDate: string;
  cost: string;
  spotsLeft: number;
  totalSpots: number;
  description: string;
  image: string;
  registerUrl?: string;
}

export const programs: Program[] = [
  {
    id: "1",
    name: "Youth Soccer League",
    ageGroup: "Kids",
    category: "Sports",
    schedule: "Tue & Thu, 5:00–7:00 PM",
    startDate: "2026-05-15",
    cost: "$45/season",
    spotsLeft: 18,
    totalSpots: 30,
    description: "Recreational soccer league for boys and girls ages 8-14. Focus on teamwork, skill development, and fun. All skill levels welcome.",
    image: "/images/program-soccer.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "2",
    name: "Robotics & Coding Club",
    ageGroup: "Teen",
    category: "STEM",
    schedule: "Wed, 4:00–6:00 PM",
    startDate: "2026-09-01",
    cost: "Free",
    spotsLeft: 8,
    totalSpots: 15,
    description: "Hands-on robotics and programming for teens 13-17. Build robots, learn Python, and compete in local STEM challenges.",
    image: "/images/program-robotics.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "3",
    name: "Senior Fitness Class",
    ageGroup: "Senior",
    category: "Fitness",
    schedule: "Mon/Wed/Fri, 10:00–11:00 AM",
    startDate: "Ongoing",
    cost: "$25/month",
    spotsLeft: 12,
    totalSpots: 20,
    description: "Gentle cardio, yoga, and tai chi designed for adults 65+. Improve balance, flexibility, and overall wellness in a supportive group setting.",
    image: "/images/program-senior-fitness.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "4",
    name: "Bingo Night",
    ageGroup: "Adult",
    category: "Social",
    schedule: "Every Friday, 6:00–8:00 PM",
    startDate: "Ongoing",
    cost: "Free",
    spotsLeft: 999,
    totalSpots: 999,
    description: "Community bingo night with prizes, refreshments, and socializing. Open to adults and seniors. Bring a friend or come make new ones.",
    image: "/images/program-senior-fitness.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "5",
    name: "After-School Art Studio",
    ageGroup: "Kids",
    category: "Arts",
    schedule: "Mon & Wed, 3:30–5:00 PM",
    startDate: "2026-08-18",
    cost: "$30/month",
    spotsLeft: 10,
    totalSpots: 16,
    description: "Creative exploration through painting, drawing, sculpture, and mixed media for ages 6-12. All supplies provided.",
    image: "/images/program-soccer.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "6",
    name: "Adult Yoga",
    ageGroup: "Adult",
    category: "Fitness",
    schedule: "Tue & Thu, 6:00–7:00 AM",
    startDate: "Ongoing",
    cost: "$35/month",
    spotsLeft: 15,
    totalSpots: 25,
    description: "Morning vinyasa yoga for adults 18+. Build strength, flexibility, and mindfulness. Suitable for all experience levels.",
    image: "/images/program-senior-fitness.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "7",
    name: "STEM Summer Camp",
    ageGroup: "Kids",
    category: "STEM",
    schedule: "Mon–Fri, 9:00 AM–3:00 PM",
    startDate: "2026-06-15",
    cost: "$120/week",
    spotsLeft: 22,
    totalSpots: 40,
    description: "Two-week immersive STEM experience for ages 10-16. Robotics, coding, engineering challenges, and field trips. Scholarships available.",
    image: "/images/program-robotics.jpg",
    registerUrl: "https://cityoftracyreccenter.com"
  },
  {
    id: "8",
    name: "Tracy Community Band",
    ageGroup: "All Ages",
    category: "Arts",
    schedule: "Mon, 7:30–9:00 PM",
    startDate: "Ongoing",
    cost: "Free",
    spotsLeft: 999,
    totalSpots: 999,
    description: "Concert Band, Jazz Ensemble, and Jazz Sextet for amateur and professional musicians. Directed by Randy Watson. Open enrollment year-round.",
    image: "/images/event-tracy-earth-day.jpg",
    registerUrl: "https://atthegrand.org"
  }
];

export const programAgeGroups = [
  "All",
  "Kids",
  "Teen",
  "Adult",
  "Senior",
  "All Ages"
];

export const programCategories = [
  "All",
  "Sports",
  "Arts",
  "STEM",
  "Fitness",
  "Social",
  "Education"
];

export const programCosts = [
  "All",
  "Free",
  "Paid"
];
