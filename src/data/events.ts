export interface Event {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attending: number;
  capacity: number;
  image: string;
  rsvpUrl?: string;
}

export const events: Event[] = [
  {
    id: "1",
    name: "Tracy Earth Day 2026",
    category: "Environment",
    date: "2026-04-25",
    time: "9:00 AM – 1:00 PM",
    location: "Downtown Tracy (9th St from Central)",
    description: "Celebrate sustainability with student presentations on environmental solutions, green business vendors, and family-friendly activities. Win $1,000 for your classroom.",
    attending: 86,
    capacity: 150,
    image: "/images/event-tracy-earth-day.jpg",
    rsvpUrl: "https://tracyearthproject.org"
  },
  {
    id: "2",
    name: "Tracy Community Band Concert",
    category: "Arts",
    date: "2026-05-04",
    time: "7:30 PM – 9:00 PM",
    location: "Eleni Kounalakis Theatre, Tracy",
    description: "Free concert featuring the Tracy Community Concert Band, Jazz Ensemble, and Jazz Sextet. Directed by Randy Watson. Open to all ages.",
    attending: 120,
    capacity: 200,
    image: "/images/event-tracy-earth-day.jpg",
    rsvpUrl: "https://atthegrand.org"
  },
  {
    id: "3",
    name: "Downtown Tracy Farmers' Market",
    category: "Food",
    date: "2026-04-25",
    time: "8:00 AM – 1:00 PM",
    location: "Downtown Tracy",
    description: "Fresh produce, local goods, baked items, and community connections. Every Saturday rain or shine. Support local farmers and artisans.",
    attending: 0,
    capacity: 999,
    image: "/images/event-food-fest.jpg"
  },
  {
    id: "4",
    name: "6th Annual Tracy Connects",
    category: "Family",
    date: "2026-09-19",
    time: "9:00 AM – 3:00 PM",
    location: "Lincoln Park, Tracy",
    description: "Tracy's largest community resource fair. Theme: 'Living Your Best Life in Tracy: Bridging the Digital Divide — Youth and Seniors.' Connect with nonprofits and discover opportunities.",
    attending: 210,
    capacity: 300,
    image: "/images/event-tracy-earth-day.jpg",
    rsvpUrl: "https://www.tracyconnects.com"
  },
  {
    id: "5",
    name: "Día de la Independencia Mexicana",
    category: "Arts",
    date: "2026-09-13",
    time: "11:00 AM – 6:00 PM",
    location: "Lincoln Park, Tracy",
    description: "Live music, traditional Mexican food, cultural performances, and celebrations honoring Mexican independence. Family-friendly festival atmosphere.",
    attending: 156,
    capacity: 250,
    image: "/images/event-food-fest.jpg"
  },
  {
    id: "6",
    name: "Tracy Food Fest",
    category: "Food",
    date: "2026-07-26",
    time: "11:00 AM – 5:00 PM",
    location: "3100 Corral Hollow Rd, Tracy",
    description: "Local restaurants, food trucks, and culinary experiences. Family fun zone, live entertainment, and free admission. Taste the best of Tracy.",
    attending: 340,
    capacity: 500,
    image: "/images/event-food-fest.jpg",
    rsvpUrl: "https://www.eventbrite.com"
  },
  {
    id: "7",
    name: "Senior Fitness Class Open House",
    category: "Health",
    date: "2026-05-15",
    time: "10:00 AM – 12:00 PM",
    location: "Lolly Hansen Senior Center, 375 E 9th St",
    description: "Try yoga, tai chi, and cardio classes for free. Open to adults 50+. Meet instructors, tour the facility, and learn about membership options.",
    attending: 28,
    capacity: 40,
    image: "/images/program-senior-fitness.jpg"
  },
  {
    id: "8",
    name: "Youth Basketball Clinic",
    category: "Sports",
    date: "2026-06-07",
    time: "9:00 AM – 12:00 PM",
    location: "Tracy Sports Complex",
    description: "Free basketball clinic for ages 8-14. Learn fundamentals from Tracy Parks & Recreation coaches. All skill levels welcome. Bring water and athletic shoes.",
    attending: 45,
    capacity: 60,
    image: "/images/program-soccer.jpg"
  },
  {
    id: "9",
    name: "Back-to-School Backpack Drive",
    category: "Education",
    date: "2026-08-01",
    time: "10:00 AM – 2:00 PM",
    location: "Tracy Interfaith Ministries, 311 W Grant Line Rd",
    description: "Help distribute backpacks and school supplies to families in need. Volunteers needed for setup, distribution, and cleanup. Great for community service hours.",
    attending: 34,
    capacity: 50,
    image: "/images/volunteer-hero.jpg",
    rsvpUrl: "https://tracyinterfaith.org"
  }
];

export const eventCategories = [
  "All",
  "Arts",
  "Sports",
  "Education",
  "Health",
  "Family",
  "Senior",
  "Youth",
  "Food",
  "Environment"
];

export const eventDateFilters = [
  { label: "All", value: "all" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Next 3 Months", value: "next-3-months" }
];
