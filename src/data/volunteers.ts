export interface VolunteerOpportunity {
  id: string;
  organization: string;
  cause: string;
  description: string;
  commitment: string;
  contact: string;
  applyUrl?: string;
}

export const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: "1",
    organization: "Tracy Interfaith Ministries",
    cause: "Food Access",
    description: "Sort groceries, bag food items, distribute meals, and assist with holiday meal programs. Help fight hunger in the Tracy community.",
    commitment: "2–4 hours/week",
    contact: "209-836-5424 | info@tracyinterfaith.org",
    applyUrl: "https://tracyinterfaith.org/volunteers"
  },
  {
    id: "2",
    organization: "Tracy Community Connections Center",
    cause: "Homelessness",
    description: "Assist with the shower program, street outreach, case management support, and laundry service. Make a direct impact on those experiencing homelessness.",
    commitment: "Flexible",
    contact: "209-407-9649 | info@tracyccc.org",
    applyUrl: "https://tracyccc.org/get-involved"
  },
  {
    id: "3",
    organization: "Animal Rescue of Tracy",
    cause: "Animals",
    description: "Cat cuddlers, foster caregivers, weekend adoption fair helpers, special events, and Compassion to Action internship. Junior volunteers (14-17) welcome.",
    commitment: "4–8 hours/month",
    contact: "209-642-4324 | contact@AnimalRescueTracy.org",
    applyUrl: "https://www.animalrescuetracy.org/volunteering"
  },
  {
    id: "4",
    organization: "Tracy Earth Project",
    cause: "Environment",
    description: "Tree planting, community garden maintenance, youth bike program, environmental outreach, and TEP Talks events. Perfect for passionate environmental advocates.",
    commitment: "Flexible",
    contact: "tracyearthproject.org",
    applyUrl: "https://tracyearthproject.org"
  },
  {
    id: "5",
    organization: "Tracy Grand Theater Center for the Arts",
    cause: "Arts",
    description: "Ushers, docents, tour guides, and internship opportunities. Be part of Tracy's creative team working in arts and entertainment.",
    commitment: "Event-based",
    contact: "209-831-6858 | Boxoffice@cityoftracy.org",
    applyUrl: "https://atthegrand.org"
  },
  {
    id: "6",
    organization: "Tracy Unity / The Young Connects",
    cause: "Community",
    description: "Event setup, information tables, kid zone supervision, food service, event ambassador, and event take-down. Great for community service hours.",
    commitment: "Event-based",
    contact: "209-200-9701 | info@TheYoungConnects.com",
    applyUrl: "https://www.tracyconnects.com"
  },
  {
    id: "7",
    organization: "Boys & Girls Club of Tracy",
    cause: "Youth",
    description: "Homework help, tutoring, technology center supervision, athletics, and recreation group activities. Help youth reach their full potential.",
    commitment: "2–6 hours/week",
    contact: "209-832-2582",
    applyUrl: "https://www.bgca.org"
  },
  {
    id: "8",
    organization: "Good Samaritan Community Thrift",
    cause: "Community",
    description: "Customer service, retail skills, cashiering, social media and marketing, and teamwork. Build job skills while giving back.",
    commitment: "3–8 hours/week",
    contact: "209-834-5438 | goodsamaritancommunitythrift@gmail.com"
  },
  {
    id: "9",
    organization: "City of Tracy — VITAL Program",
    cause: "Community",
    description: "Volunteers In Tracy Actively Linked. Various city programs and events. Open to all ages. Students can earn community service hours.",
    commitment: "Flexible",
    contact: "209-831-6200 | parks@cityoftracy.org",
    applyUrl: "https://www.cityoftracy.org"
  },
  {
    id: "10",
    organization: "Living Grace Senior Care",
    cause: "Seniors",
    description: "Conduct activities, read aloud, play games, and provide companionship. Must love working with people and feel comfortable with the elderly.",
    commitment: "2–4 hours/week",
    contact: "209-833-2200"
  }
];

export const volunteerCauses = [
  "All",
  "Environment",
  "Youth",
  "Seniors",
  "Food Access",
  "Animals",
  "Homelessness",
  "Arts",
  "Community"
];

export interface DonationOrg {
  id: string;
  name: string;
  description: string;
  impact: string[];
  donateUrl: string;
}

export const donationOrgs: DonationOrg[] = [
  {
    id: "1",
    name: "Tracy Community Connections Center",
    description: "As a 501(c)(3) nonprofit, TCCC relies on generous donors to continue offering critical services to those experiencing homelessness in Tracy.",
    impact: [
      "Provide clean showers and essential hygiene products",
      "Fund street outreach team and case managers",
      "Support emergency resources like motel stays and transportation"
    ],
    donateUrl: "https://tracyccc.org/donate"
  },
  {
    id: "2",
    name: "Tracy Interfaith Ministries",
    description: "Your donation supports emergency food distribution, clothing for families, utility bill assistance, and holiday meals for those in need.",
    impact: [
      "Distribute meals' worth of groceries every month",
      "Rescue food from grocery stores to reduce waste",
      "Provide backpacks with school supplies to children"
    ],
    donateUrl: "https://tracyinterfaith.org"
  },
  {
    id: "3",
    name: "A To Z Psychotherapy",
    description: "Help provide accessible mental health services and education to at-risk women and children in order to strengthen communities and families.",
    impact: [
      "Fund individual and group therapy sessions",
      "Support child and adolescent therapy programs",
      "Train the next generation of helping professionals"
    ],
    donateUrl: "https://www.atozpsychotherapy.org"
  }
];

export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  gradeLevels: string;
  availability: string;
  cost: string;
  description: string;
  contact: string;
}

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Boys & Girls Club Homework Help",
    subjects: ["All Subjects"],
    gradeLevels: "K–8",
    availability: "Mon–Thu, 3:00–6:00 PM",
    cost: "Free",
    description: "After-school homework support and tutoring in a supervised, supportive environment with trained staff.",
    contact: "209-832-2582"
  },
  {
    id: "2",
    name: "Give Every Child a Chance",
    subjects: ["Math", "Reading"],
    gradeLevels: "K–12",
    availability: "Flexible scheduling",
    cost: "Free",
    description: "One-on-one and small group tutoring focused on building foundational math and reading skills.",
    contact: "209-823-6222"
  },
  {
    id: "3",
    name: "T & J Educational Tutoring",
    subjects: ["STEM", "Science", "Technology", "Engineering", "Math"],
    gradeLevels: "K–12",
    availability: "By appointment",
    cost: "Low-cost",
    description: "Specialized STEM tutoring with hands-on activities and real-world applications to spark curiosity.",
    contact: "209-914-5800"
  },
  {
    id: "4",
    name: "Tracy Library Homework Help",
    subjects: ["All Subjects"],
    gradeLevels: "K–12",
    availability: "Mon–Thu, 4:00–6:00 PM",
    cost: "Free",
    description: "Drop-in homework assistance at the Tracy Branch Library with volunteer tutors and library staff.",
    contact: "209-831-4255"
  }
];

export interface Skill {
  id: string;
  skill: string;
  category: string;
  description: string;
  availability: string;
  contact: string;
}

export const skills: Skill[] = [
  {
    id: "1",
    skill: "Bike Repair",
    category: "Home Repair",
    description: "Can fix flat tires, adjust brakes, replace chains, and perform basic bike maintenance. Have tools and experience.",
    availability: "Weekends, 9 AM – 5 PM",
    contact: "bikehelper.tracy@email.com"
  },
  {
    id: "2",
    skill: "Basic Plumbing",
    category: "Home Repair",
    description: "Leaky faucets, clogged drains, running toilets, and minor pipe repairs. Licensed handyman with 10+ years experience.",
    availability: "Evenings & weekends",
    contact: "plumbing.tracy@email.com"
  },
  {
    id: "3",
    skill: "Tech Help",
    category: "Tech Help",
    description: "Smartphone setup, computer troubleshooting, WiFi setup, printer connections, and basic software help. Patient and friendly.",
    availability: "Flexible — call to schedule",
    contact: "techhelp.tracy@email.com"
  },
  {
    id: "4",
    skill: "ESL Tutoring",
    category: "Education",
    description: "Conversational English practice for beginners and intermediate learners. Bilingual in Spanish and English.",
    availability: "Weekends, 10 AM – 4 PM",
    contact: "esl.tracy@email.com"
  }
];

export const skillCategories = [
  "Home Repair",
  "Transportation",
  "Tech Help",
  "Education",
  "Arts",
  "Fitness",
  "Other"
];
