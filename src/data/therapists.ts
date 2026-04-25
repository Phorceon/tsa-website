export interface Therapist {
  id: string;
  name: string;
  credentials: string;
  specialties: string[];
  insurance: string[];
  languages: string[];
  format: string[];
  acceptingNew: boolean;
  phone?: string;
  website?: string;
  address?: string;
}

export const therapists: Therapist[] = [
  {
    id: "1",
    name: "Patricia Graves",
    credentials: "MS, AMFT",
    specialties: ["Anxiety", "Depression", "Adolescents"],
    insurance: ["Blue Shield", "Cigna"],
    languages: ["English", "Spanish"],
    format: ["In-person"],
    acceptingNew: true,
    phone: "209-555-0142",
    address: "Tracy, CA"
  },
  {
    id: "2",
    name: "Nicole Quintal",
    credentials: "LPCC",
    specialties: ["Trauma", "PTSD", "Anxiety"],
    insurance: ["Aetna", "Anthem"],
    languages: ["English"],
    format: ["Telehealth"],
    acceptingNew: true,
    phone: "209-555-0187",
    address: "Tracy, CA"
  },
  {
    id: "3",
    name: "Vicki Stokes",
    credentials: "LCSW",
    specialties: ["Depression", "Grief", "Seniors"],
    insurance: ["Blue Shield", "Medicare"],
    languages: ["English"],
    format: ["In-person", "Telehealth"],
    acceptingNew: true,
    phone: "209-555-0165",
    address: "Tracy, CA"
  },
  {
    id: "4",
    name: "Dr. Razan's Therapy Services",
    credentials: "Licensed Therapist",
    specialties: ["Couples", "Marriage", "Career"],
    insurance: ["Self-Pay", "Sliding Scale"],
    languages: ["English", "Arabic"],
    format: ["In-person", "Telehealth"],
    acceptingNew: true,
    phone: "209-555-0199",
    website: "https://razanstherapeuticservices.com",
    address: "Tracy, CA"
  },
  {
    id: "5",
    name: "A To Z Psychotherapy",
    credentials: "Licensed Clinical Team",
    specialties: ["Children 5+", "Family", "Group Therapy"],
    insurance: ["MediCal", "Sliding Scale"],
    languages: ["English", "Spanish"],
    format: ["In-person"],
    acceptingNew: true,
    phone: "209-627-7667",
    website: "https://www.atozpsychotherapy.org",
    address: "35 E 10th St, Suite A, Tracy, CA 95376"
  },
  {
    id: "6",
    name: "Mindpath Health — Tracy",
    credentials: "Psychiatry & Therapy Team",
    specialties: ["Psychiatry", "Medication Management", "Bipolar"],
    insurance: ["Major Insurance"],
    languages: ["English"],
    format: ["In-person", "Telehealth"],
    acceptingNew: false,
    phone: "209-555-0123",
    website: "https://www.mindpath.com",
    address: "Tracy, CA"
  }
];

export const therapistSpecialties = [
  "All",
  "Anxiety",
  "Depression",
  "Trauma",
  "PTSD",
  "Adolescents",
  "Couples",
  "Marriage",
  "Career",
  "Grief",
  "Seniors",
  "Family",
  "Group Therapy",
  "Children 5+",
  "Psychiatry",
  "Medication Management",
  "Bipolar"
];

export const therapistInsurance = [
  "All",
  "Blue Shield",
  "Cigna",
  "Aetna",
  "Anthem",
  "Kaiser",
  "Medicare",
  "MediCal",
  "Self-Pay",
  "Sliding Scale",
  "Major Insurance"
];

export const therapistLanguages = [
  "All",
  "English",
  "Spanish",
  "Mandarin",
  "Tagalog",
  "Arabic"
];

export const therapistFormats = [
  "All",
  "In-person",
  "Telehealth"
];
