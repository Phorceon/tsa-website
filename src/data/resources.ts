export interface Resource {
  id: string;
  name: string;
  categories: string[];
  description: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
}

export const resources: Resource[] = [
  {
    id: "1",
    name: "Tracy Interfaith Ministries",
    categories: ["Food & Basic Needs", "Clothing"],
    description: "Provides emergency food, gently-used clothing, hygiene products, and diapers to low-income and homeless families and individuals in Tracy, California.",
    phone: "209-836-5424",
    email: "info@tracyinterfaith.org",
    website: "https://tracyinterfaith.org",
    address: "311 W Grant Line Rd, Tracy, CA 95376",
    hours: "Mon–Thu: 10:00 AM – 2:00 PM"
  },
  {
    id: "2",
    name: "Tracy Community Connections Center",
    categories: ["Housing", "Health"],
    description: "Housing navigation, full-time case management, showers, laundry service, and street outreach for individuals and families experiencing homelessness in Tracy.",
    phone: "209-407-9649",
    email: "info@tracyccc.org",
    website: "https://tracyccc.org",
    address: "324 E 11th St, Tracy, CA 95376",
    hours: "Mon–Fri: 9:00 AM – 5:00 PM"
  },
  {
    id: "3",
    name: "McHenry House / Tracy Family Shelter",
    categories: ["Housing", "Family"],
    description: "Emergency shelter and transitional housing for homeless families with children. Provides case management, meals, and referral services.",
    phone: "209-835-2328",
    email: "info@mchenryhousetracy.org",
    address: "Tracy, CA",
    hours: "24/7 Intake Line"
  },
  {
    id: "4",
    name: "A To Z Psychotherapy",
    categories: ["Health", "Youth"],
    description: "Accessible, culturally competent mental health services for at-risk women and children. Individual, family, couples, and group therapy. Ages 5 and up.",
    phone: "209-627-7667",
    address: "35 E 10th St, Suite A, Tracy, CA 95376",
    website: "https://www.atozpsychotherapy.org",
    hours: "Mon–Fri: 9:00 AM – 6:00 PM"
  },
  {
    id: "5",
    name: "Lolly Hansen Senior Center",
    categories: ["Seniors", "Health", "Fitness"],
    description: "Recreational activities, health and wellness programs, seminars, and resource center for adults 50+. Classes include Cardio, Yoga, Tai Chi, and jewelry making.",
    phone: "209-831-6240",
    email: "tracyseniorcenter@cityoftracy.org",
    address: "375 E 9th St, Tracy, CA 95376",
    website: "https://www.cityoftracy.org/our-city/departments/parks-recreation-department/seniors",
    hours: "Mon–Fri: 8:00 AM – 4:00 PM"
  },
  {
    id: "6",
    name: "Tracy Family Resource Center",
    categories: ["Education", "Food & Basic Needs"],
    description: "MediCal enrollment, ID assistance, REACH, food stamps, and mobile farmers market. Provides referrals for families in need.",
    phone: "209-229-4922",
    address: "236 W Beverly Pl, Tracy, CA 95376",
    hours: "Mon–Fri: 8:00 AM – 5:00 PM"
  },
  {
    id: "7",
    name: "Tracy Boys & Girls Club",
    categories: ["Youth", "Education", "Sports"],
    description: "After-school programs, tutoring, technology center, athletics, leadership activities, and recreation for youth ages 6-18.",
    phone: "209-832-2582",
    address: "Various locations in Tracy, CA",
    website: "https://www.bgca.org",
    hours: "School days: 2:00 PM – 7:00 PM"
  },
  {
    id: "8",
    name: "Tracy Earth Project",
    categories: ["Environment", "Youth", "Education"],
    description: "Environmental sustainability education, youth bike program, community garden, tree planting, and regenerative gardening workshops.",
    website: "https://tracyearthproject.org",
    address: "Tracy, CA",
    hours: "Events announced on website"
  },
  {
    id: "9",
    name: "San Joaquin County Human Services Agency",
    categories: ["Employment", "Legal Aid", "Food & Basic Needs"],
    description: "Direct and referral services including employment assistance, MediCal, CalFresh, CalWORKs, and general relief benefits.",
    phone: "209-468-1000",
    address: "Multiple locations in San Joaquin County",
    website: "https://www.sjgov.org/hsa",
    hours: "Mon–Fri: 8:00 AM – 5:00 PM"
  },
  {
    id: "10",
    name: "Tracy African American Association",
    categories: ["Education", "Community"],
    description: "Community empowerment, educational programs, scholarships, and cultural events for Tracy's African American community.",
    phone: "209-249-6644",
    address: "Tracy, CA",
    hours: "Contact for schedule"
  },
  {
    id: "11",
    name: "Living Grace Senior Care",
    categories: ["Seniors", "Health"],
    description: "Senior retirement activities, games, reading, companionship programs, and volunteer opportunities for those who love working with the elderly.",
    phone: "209-833-2200",
    address: "Tracy, CA",
    hours: "Contact for schedule"
  },
  {
    id: "12",
    name: "Tracy Volunteer Caregivers",
    categories: ["Health", "Seniors", "Community"],
    description: "Non-medical assistance, transportation to appointments, companionship, and errand services for seniors and disabled residents.",
    phone: "209-835-2772",
    address: "Tracy, CA",
    hours: "Contact for scheduling"
  },
  {
    id: "13",
    name: "Tracy Police Department",
    categories: ["Legal Aid", "Community"],
    description: "Non-emergency police services, community outreach programs, neighborhood watch support, and public safety resources.",
    phone: "209-831-6550",
    address: "1000 Civic Center Dr, Tracy, CA 95376",
    website: "https://www.cityoftracy.org/departments/police-department",
    hours: "Non-emergency: Mon–Fri 8:00 AM – 5:00 PM"
  },
  {
    id: "14",
    name: "Tracy Fire Department",
    categories: ["Health", "Community"],
    description: "Fire prevention education, emergency medical services, community safety programs, and CPR/first aid training.",
    phone: "209-831-4200",
    address: "Tracy, CA",
    website: "https://www.cityoftracy.org/departments/fire-department",
    hours: "Emergency: 911 | Non-emergency: Mon–Fri"
  },
  {
    id: "15",
    name: "Hill Foundation Community Food Bank",
    categories: ["Food & Basic Needs"],
    description: "Emergency food assistance for San Joaquin County residents. Provides groceries, fresh produce, and nutritional support.",
    phone: "209-464-7369",
    address: "7 W Scotts Ave, Stockton, CA 95203",
    website: "https://www.sjcfoodforyou.org",
    hours: "Distribution days vary by location"
  }
];

export const resourceCategories = [
  "All",
  "Housing",
  "Food & Basic Needs",
  "Education",
  "Employment",
  "Legal Aid",
  "Health",
  "Seniors",
  "Youth",
  "Environment",
  "Community",
  "Fitness",
  "Clothing",
  "Family",
  "Sports"
];
