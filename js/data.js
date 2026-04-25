export const events = [
  {
    id: '1',
    name: 'Tracy Earth Day 2026',
    category: 'Environment',
    date: '2026-04-25',
    time: '9:00 AM – 1:00 PM',
    location: 'Downtown Tracy (9th St from Central)',
    description:
      'Celebrate sustainability with student presentations on environmental solutions, green business vendors, and family-friendly activities. Win $1,000 for your classroom.',
    attending: 86,
    capacity: 150,
    image: './images/event-tracy-earth-day.jpg',
    rsvpUrl: 'https://tracyearthproject.org',
  },
  {
    id: '2',
    name: 'Tracy Community Band Concert',
    category: 'Arts',
    date: '2026-05-04',
    time: '7:30 PM – 9:00 PM',
    location: 'Eleni Kounalakis Theatre, Tracy',
    description:
      'Free concert featuring the Tracy Community Concert Band, Jazz Ensemble, and Jazz Sextet. Directed by Randy Watson. Open to all ages.',
    attending: 120,
    capacity: 200,
    image: './images/event-tracy-earth-day.jpg',
    rsvpUrl: 'https://atthegrand.org',
  },
  {
    id: '3',
    name: "Downtown Tracy Farmers' Market",
    category: 'Food',
    date: '2026-04-25',
    time: '8:00 AM – 1:00 PM',
    location: 'Downtown Tracy',
    description:
      'Fresh produce, local goods, baked items, and community connections. Every Saturday rain or shine. Support local farmers and artisans.',
    attending: 0,
    capacity: 999,
    image: './images/event-food-fest.jpg',
  },
  {
    id: '4',
    name: '6th Annual Tracy Connects',
    category: 'Family',
    date: '2026-09-19',
    time: '9:00 AM – 3:00 PM',
    location: 'Lincoln Park, Tracy',
    description:
      "Tracy's largest community resource fair. Theme: 'Living Your Best Life in Tracy: Bridging the Digital Divide — Youth and Seniors.' Connect with nonprofits and discover opportunities.",
    attending: 210,
    capacity: 300,
    image: './images/event-tracy-earth-day.jpg',
    rsvpUrl: 'https://www.tracyconnects.com',
  },
  {
    id: '5',
    name: 'Día de la Independencia Mexicana',
    category: 'Arts',
    date: '2026-09-13',
    time: '11:00 AM – 6:00 PM',
    location: 'Lincoln Park, Tracy',
    description:
      'Live music, traditional Mexican food, cultural performances, and celebrations honoring Mexican independence. Family-friendly festival atmosphere.',
    attending: 156,
    capacity: 250,
    image: './images/event-food-fest.jpg',
  },
  {
    id: '6',
    name: 'Tracy Food Fest',
    category: 'Food',
    date: '2026-07-26',
    time: '11:00 AM – 5:00 PM',
    location: '3100 Corral Hollow Rd, Tracy',
    description:
      'Local restaurants, food trucks, and culinary experiences. Family fun zone, live entertainment, and free admission. Taste the best of Tracy.',
    attending: 340,
    capacity: 500,
    image: './images/event-food-fest.jpg',
    rsvpUrl: 'https://www.eventbrite.com',
  },
  {
    id: '7',
    name: 'Senior Fitness Class Open House',
    category: 'Health',
    date: '2026-05-15',
    time: '10:00 AM – 12:00 PM',
    location: 'Lolly Hansen Senior Center, 375 E 9th St',
    description:
      'Try yoga, tai chi, and cardio classes for free. Open to adults 50+. Meet instructors, tour the facility, and learn about membership options.',
    attending: 28,
    capacity: 40,
    image: './images/program-senior-fitness.jpg',
  },
  {
    id: '8',
    name: 'Youth Basketball Clinic',
    category: 'Sports',
    date: '2026-06-07',
    time: '9:00 AM – 12:00 PM',
    location: 'Tracy Sports Complex',
    description:
      'Free basketball clinic for ages 8-14. Learn fundamentals from Tracy Parks & Recreation coaches. All skill levels welcome. Bring water and athletic shoes.',
    attending: 45,
    capacity: 60,
    image: './images/program-soccer.jpg',
  },
  {
    id: '9',
    name: 'Back-to-School Backpack Drive',
    category: 'Education',
    date: '2026-08-01',
    time: '10:00 AM – 2:00 PM',
    location: 'Tracy Interfaith Ministries, 311 W Grant Line Rd',
    description:
      'Help distribute backpacks and school supplies to families in need. Volunteers needed for setup, distribution, and cleanup. Great for community service hours.',
    attending: 34,
    capacity: 50,
    image: './images/volunteer-hero.jpg',
    rsvpUrl: 'https://tracyinterfaith.org',
  },
];

export const eventCategories = [
  'All',
  'Arts',
  'Sports',
  'Education',
  'Health',
  'Family',
  'Senior',
  'Youth',
  'Food',
  'Environment',
];

export const eventDateFilters = [
  { label: 'All', value: 'all' },
  { label: 'This Week', value: 'this-week' },
  { label: 'This Month', value: 'this-month' },
  { label: 'Next 3 Months', value: 'next-3-months' },
];

export const resources = [
  {
    id: '1',
    name: 'Tracy Interfaith Ministries',
    categories: ['Food & Basic Needs', 'Clothing'],
    description:
      'Provides emergency food, gently-used clothing, hygiene products, and diapers to low-income and homeless families and individuals in Tracy, California.',
    phone: '209-836-5424',
    email: 'info@tracyinterfaith.org',
    website: 'https://tracyinterfaith.org',
    address: '311 W Grant Line Rd, Tracy, CA 95376',
    hours: 'Mon–Thu: 10:00 AM – 2:00 PM',
  },
  {
    id: '2',
    name: 'Tracy Community Connections Center',
    categories: ['Housing', 'Health'],
    description:
      'Housing navigation, full-time case management, showers, laundry service, and street outreach for individuals and families experiencing homelessness in Tracy.',
    phone: '209-407-9649',
    email: 'info@tracyccc.org',
    website: 'https://tracyccc.org',
    address: '324 E 11th St, Tracy, CA 95376',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM',
  },
  {
    id: '3',
    name: 'McHenry House / Tracy Family Shelter',
    categories: ['Housing', 'Family'],
    description:
      'Emergency shelter and transitional housing for homeless families with children. Provides case management, meals, and referral services.',
    phone: '209-835-2328',
    email: 'info@mchenryhousetracy.org',
    address: 'Tracy, CA',
    hours: '24/7 Intake Line',
  },
  {
    id: '4',
    name: 'A To Z Psychotherapy',
    categories: ['Health', 'Youth'],
    description:
      'Accessible, culturally competent mental health services for at-risk women and children. Individual, family, couples, and group therapy. Ages 5 and up.',
    phone: '209-627-7667',
    address: '35 E 10th St, Suite A, Tracy, CA 95376',
    website: 'https://www.atozpsychotherapy.org',
    hours: 'Mon–Fri: 9:00 AM – 6:00 PM',
  },
  {
    id: '5',
    name: 'Lolly Hansen Senior Center',
    categories: ['Seniors', 'Health', 'Fitness'],
    description:
      'Recreational activities, health and wellness programs, seminars, and resource center for adults 50+. Classes include Cardio, Yoga, Tai Chi, and jewelry making.',
    phone: '209-831-6240',
    email: 'tracyseniorcenter@cityoftracy.org',
    address: '375 E 9th St, Tracy, CA 95376',
    website: 'https://www.cityoftracy.org/our-city/departments/parks-recreation-department/seniors',
    hours: 'Mon–Fri: 8:00 AM – 4:00 PM',
  },
  {
    id: '6',
    name: 'Tracy Family Resource Center',
    categories: ['Education', 'Food & Basic Needs'],
    description:
      'MediCal enrollment, ID assistance, REACH, food stamps, and mobile farmers market. Provides referrals for families in need.',
    phone: '209-229-4922',
    address: '236 W Beverly Pl, Tracy, CA 95376',
    hours: 'Mon–Fri: 8:00 AM – 5:00 PM',
  },
  {
    id: '7',
    name: 'Tracy Boys & Girls Club',
    categories: ['Youth', 'Education', 'Sports'],
    description:
      'After-school programs, tutoring, technology center, athletics, leadership activities, and recreation for youth ages 6-18.',
    phone: '209-832-2582',
    address: 'Various locations in Tracy, CA',
    website: 'https://www.bgca.org',
    hours: 'School days: 2:00 PM – 7:00 PM',
  },
  {
    id: '8',
    name: 'Tracy Earth Project',
    categories: ['Environment', 'Youth', 'Education'],
    description:
      'Environmental sustainability education, youth bike program, community garden, tree planting, and regenerative gardening workshops.',
    website: 'https://tracyearthproject.org',
    address: 'Tracy, CA',
    hours: 'Events announced on website',
  },
  {
    id: '9',
    name: 'San Joaquin County Human Services Agency',
    categories: ['Employment', 'Legal Aid', 'Food & Basic Needs'],
    description:
      'Direct and referral services including employment assistance, MediCal, CalFresh, CalWORKs, and general relief benefits.',
    phone: '209-468-1000',
    address: 'Multiple locations in San Joaquin County',
    website: 'https://www.sjgov.org/hsa',
    hours: 'Mon–Fri: 8:00 AM – 5:00 PM',
  },
  {
    id: '10',
    name: 'Tracy African American Association',
    categories: ['Education', 'Community'],
    description:
      "Community empowerment, educational programs, scholarships, and cultural events for Tracy's African American community.",
    phone: '209-249-6644',
    address: 'Tracy, CA',
    hours: 'Contact for schedule',
  },
  {
    id: '11',
    name: 'Living Grace Senior Care',
    categories: ['Seniors', 'Health'],
    description:
      'Senior retirement activities, games, reading, companionship programs, and volunteer opportunities for those who love working with the elderly.',
    phone: '209-833-2200',
    address: 'Tracy, CA',
    hours: 'Contact for schedule',
  },
  {
    id: '12',
    name: 'Tracy Volunteer Caregivers',
    categories: ['Health', 'Seniors', 'Community'],
    description:
      'Non-medical assistance, transportation to appointments, companionship, and errand services for seniors and disabled residents.',
    phone: '209-835-2772',
    address: 'Tracy, CA',
    hours: 'Contact for scheduling',
  },
  {
    id: '13',
    name: 'Tracy Police Department',
    categories: ['Legal Aid', 'Community'],
    description:
      'Non-emergency police services, community outreach programs, neighborhood watch support, and public safety resources.',
    phone: '209-831-6550',
    address: '1000 Civic Center Dr, Tracy, CA 95376',
    website: 'https://www.cityoftracy.org/departments/police-department',
    hours: 'Non-emergency: Mon–Fri 8:00 AM – 5:00 PM',
  },
  {
    id: '14',
    name: 'Tracy Fire Department',
    categories: ['Health', 'Community'],
    description:
      'Fire prevention education, emergency medical services, community safety programs, and CPR/first aid training.',
    phone: '209-831-4200',
    address: 'Tracy, CA',
    website: 'https://www.cityoftracy.org/departments/fire-department',
    hours: 'Emergency: 911 | Non-emergency: Mon–Fri',
  },
  {
    id: '15',
    name: 'Hill Foundation Community Food Bank',
    categories: ['Food & Basic Needs'],
    description:
      'Emergency food assistance for San Joaquin County residents. Provides groceries, fresh produce, and nutritional support.',
    phone: '209-464-7369',
    address: '7 W Scotts Ave, Stockton, CA 95203',
    website: 'https://www.sjcfoodforyou.org',
    hours: 'Distribution days vary by location',
  },
];

export const resourceCategories = [
  'All',
  'Housing',
  'Food & Basic Needs',
  'Education',
  'Employment',
  'Legal Aid',
  'Health',
  'Seniors',
  'Youth',
  'Environment',
  'Community',
  'Fitness',
  'Clothing',
  'Family',
  'Sports',
];

export const therapists = [
  {
    id: '1',
    name: 'Patricia Graves',
    credentials: 'MS, AMFT',
    specialties: ['Anxiety', 'Depression', 'Adolescents'],
    insurance: ['Blue Shield', 'Cigna'],
    languages: ['English', 'Spanish'],
    format: ['In-person'],
    acceptingNew: true,
    phone: '209-555-0142',
    address: 'Tracy, CA',
  },
  {
    id: '2',
    name: 'Nicole Quintal',
    credentials: 'LPCC',
    specialties: ['Trauma', 'PTSD', 'Anxiety'],
    insurance: ['Aetna', 'Anthem'],
    languages: ['English'],
    format: ['Telehealth'],
    acceptingNew: true,
    phone: '209-555-0187',
    address: 'Tracy, CA',
  },
  {
    id: '3',
    name: 'Vicki Stokes',
    credentials: 'LCSW',
    specialties: ['Depression', 'Grief', 'Seniors'],
    insurance: ['Blue Shield', 'Medicare'],
    languages: ['English'],
    format: ['In-person', 'Telehealth'],
    acceptingNew: true,
    phone: '209-555-0165',
    address: 'Tracy, CA',
  },
  {
    id: '4',
    name: "Dr. Razan's Therapy Services",
    credentials: 'Licensed Therapist',
    specialties: ['Couples', 'Marriage', 'Career'],
    insurance: ['Self-Pay', 'Sliding Scale'],
    languages: ['English', 'Arabic'],
    format: ['In-person', 'Telehealth'],
    acceptingNew: true,
    phone: '209-555-0199',
    website: 'https://razanstherapeuticservices.com',
    address: 'Tracy, CA',
  },
  {
    id: '5',
    name: 'A To Z Psychotherapy',
    credentials: 'Licensed Clinical Team',
    specialties: ['Children 5+', 'Family', 'Group Therapy'],
    insurance: ['MediCal', 'Sliding Scale'],
    languages: ['English', 'Spanish'],
    format: ['In-person'],
    acceptingNew: true,
    phone: '209-627-7667',
    website: 'https://www.atozpsychotherapy.org',
    address: '35 E 10th St, Suite A, Tracy, CA 95376',
  },
  {
    id: '6',
    name: 'Mindpath Health — Tracy',
    credentials: 'Psychiatry & Therapy Team',
    specialties: ['Psychiatry', 'Medication Management', 'Bipolar'],
    insurance: ['Major Insurance'],
    languages: ['English'],
    format: ['In-person', 'Telehealth'],
    acceptingNew: false,
    phone: '209-555-0123',
    website: 'https://www.mindpath.com',
    address: 'Tracy, CA',
  },
];

export const therapistSpecialties = [
  'All',
  'Anxiety',
  'Depression',
  'Trauma',
  'PTSD',
  'Adolescents',
  'Couples',
  'Marriage',
  'Career',
  'Grief',
  'Seniors',
  'Family',
  'Group Therapy',
  'Children 5+',
  'Psychiatry',
  'Medication Management',
  'Bipolar',
];

export const therapistInsurance = [
  'All',
  'Blue Shield',
  'Cigna',
  'Aetna',
  'Anthem',
  'Kaiser',
  'Medicare',
  'MediCal',
  'Self-Pay',
  'Sliding Scale',
  'Major Insurance',
];

export const therapistLanguages = ['All', 'English', 'Spanish', 'Mandarin', 'Tagalog', 'Arabic'];

export const therapistFormats = ['All', 'In-person', 'Telehealth'];

export const programs = [
  {
    id: '1',
    name: 'Youth Soccer League',
    ageGroup: 'Kids',
    category: 'Sports',
    schedule: 'Tue & Thu, 5:00–7:00 PM',
    startDate: '2026-05-15',
    cost: '$45/season',
    spotsLeft: 18,
    totalSpots: 30,
    description:
      'Recreational soccer league for boys and girls ages 8-14. Focus on teamwork, skill development, and fun. All skill levels welcome.',
    image: './images/program-soccer.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '2',
    name: 'Robotics & Coding Club',
    ageGroup: 'Teen',
    category: 'STEM',
    schedule: 'Wed, 4:00–6:00 PM',
    startDate: '2026-09-01',
    cost: 'Free',
    spotsLeft: 8,
    totalSpots: 15,
    description:
      'Hands-on robotics and programming for teens 13-17. Build robots, learn Python, and compete in local STEM challenges.',
    image: './images/program-robotics.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '3',
    name: 'Senior Fitness Class',
    ageGroup: 'Senior',
    category: 'Fitness',
    schedule: 'Mon/Wed/Fri, 10:00–11:00 AM',
    startDate: 'Ongoing',
    cost: '$25/month',
    spotsLeft: 12,
    totalSpots: 20,
    description:
      'Gentle cardio, yoga, and tai chi designed for adults 65+. Improve balance, flexibility, and overall wellness in a supportive group setting.',
    image: './images/program-senior-fitness.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '4',
    name: 'Bingo Night',
    ageGroup: 'Adult',
    category: 'Social',
    schedule: 'Every Friday, 6:00–8:00 PM',
    startDate: 'Ongoing',
    cost: 'Free',
    spotsLeft: 999,
    totalSpots: 999,
    description:
      'Community bingo night with prizes, refreshments, and socializing. Open to adults and seniors. Bring a friend or come make new ones.',
    image: './images/program-senior-fitness.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '5',
    name: 'After-School Art Studio',
    ageGroup: 'Kids',
    category: 'Arts',
    schedule: 'Mon & Wed, 3:30–5:00 PM',
    startDate: '2026-08-18',
    cost: '$30/month',
    spotsLeft: 10,
    totalSpots: 16,
    description:
      'Creative exploration through painting, drawing, sculpture, and mixed media for ages 6-12. All supplies provided.',
    image: './images/program-soccer.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '6',
    name: 'Adult Yoga',
    ageGroup: 'Adult',
    category: 'Fitness',
    schedule: 'Tue & Thu, 6:00–7:00 AM',
    startDate: 'Ongoing',
    cost: '$35/month',
    spotsLeft: 15,
    totalSpots: 25,
    description:
      'Morning vinyasa yoga for adults 18+. Build strength, flexibility, and mindfulness. Suitable for all experience levels.',
    image: './images/program-senior-fitness.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '7',
    name: 'STEM Summer Camp',
    ageGroup: 'Kids',
    category: 'STEM',
    schedule: 'Mon–Fri, 9:00 AM–3:00 PM',
    startDate: '2026-06-15',
    cost: '$120/week',
    spotsLeft: 22,
    totalSpots: 40,
    description:
      'Two-week immersive STEM experience for ages 10-16. Robotics, coding, engineering challenges, and field trips. Scholarships available.',
    image: './images/program-robotics.jpg',
    registerUrl: 'https://cityoftracyreccenter.com',
  },
  {
    id: '8',
    name: 'Tracy Community Band',
    ageGroup: 'All Ages',
    category: 'Arts',
    schedule: 'Mon, 7:30–9:00 PM',
    startDate: 'Ongoing',
    cost: 'Free',
    spotsLeft: 999,
    totalSpots: 999,
    description:
      'Concert Band, Jazz Ensemble, and Jazz Sextet for amateur and professional musicians. Directed by Randy Watson. Open enrollment year-round.',
    image: './images/event-tracy-earth-day.jpg',
    registerUrl: 'https://atthegrand.org',
  },
];

export const programAgeGroups = ['All', 'Kids', 'Teen', 'Adult', 'Senior', 'All Ages'];

export const programCategories = ['All', 'Sports', 'Arts', 'STEM', 'Fitness', 'Social', 'Education'];

export const programCosts = ['All', 'Free', 'Paid'];

export const volunteerOpportunities = [
  {
    id: '1',
    organization: 'Tracy Interfaith Ministries',
    cause: 'Food Access',
    description:
      'Sort groceries, bag food items, distribute meals, and assist with holiday meal programs. Help fight hunger in the Tracy community.',
    commitment: '2–4 hours/week',
    contact: '209-836-5424 | info@tracyinterfaith.org',
    applyUrl: 'https://tracyinterfaith.org/volunteers',
  },
  {
    id: '2',
    organization: 'Tracy Community Connections Center',
    cause: 'Homelessness',
    description:
      'Assist with the shower program, street outreach, case management support, and laundry service. Make a direct impact on those experiencing homelessness.',
    commitment: 'Flexible',
    contact: '209-407-9649 | info@tracyccc.org',
    applyUrl: 'https://tracyccc.org/get-involved',
  },
  {
    id: '3',
    organization: 'Animal Rescue of Tracy',
    cause: 'Animals',
    description:
      'Cat cuddlers, foster caregivers, weekend adoption fair helpers, special events, and Compassion to Action internship. Junior volunteers (14-17) welcome.',
    commitment: '4–8 hours/month',
    contact: '209-642-4324 | contact@AnimalRescueTracy.org',
    applyUrl: 'https://www.animalrescuetracy.org/volunteering',
  },
  {
    id: '4',
    organization: 'Tracy Earth Project',
    cause: 'Environment',
    description:
      'Tree planting, community garden maintenance, youth bike program, environmental outreach, and TEP Talks events. Perfect for passionate environmental advocates.',
    commitment: 'Flexible',
    contact: 'tracyearthproject.org',
    applyUrl: 'https://tracyearthproject.org',
  },
  {
    id: '5',
    organization: 'Tracy Grand Theater Center for the Arts',
    cause: 'Arts',
    description:
      "Ushers, docents, tour guides, and internship opportunities. Be part of Tracy's creative team working in arts and entertainment.",
    commitment: 'Event-based',
    contact: '209-831-6858 | Boxoffice@cityoftracy.org',
    applyUrl: 'https://atthegrand.org',
  },
  {
    id: '6',
    organization: 'Tracy Connects / The Young Connects',
    cause: 'Community',
    description:
      'Event setup, information tables, kid zone supervision, food service, event ambassador, and event take-down. Great for community service hours.',
    commitment: 'Event-based',
    contact: '209-200-9701 | info@TheYoungConnects.com',
    applyUrl: 'https://www.tracyconnects.com',
  },
  {
    id: '7',
    organization: 'Boys & Girls Club of Tracy',
    cause: 'Youth',
    description:
      'Homework help, tutoring, technology center supervision, athletics, and recreation group activities. Help youth reach their full potential.',
    commitment: '2–6 hours/week',
    contact: '209-832-2582',
    applyUrl: 'https://www.bgca.org',
  },
  {
    id: '8',
    organization: 'Good Samaritan Community Thrift',
    cause: 'Community',
    description:
      'Customer service, retail skills, cashiering, social media and marketing, and teamwork. Build job skills while giving back.',
    commitment: '3–8 hours/week',
    contact: '209-834-5438 | goodsamaritancommunitythrift@gmail.com',
  },
  {
    id: '9',
    organization: 'City of Tracy — VITAL Program',
    cause: 'Community',
    description:
      'Volunteers In Tracy Actively Linked. Various city programs and events. Open to all ages. Students can earn community service hours.',
    commitment: 'Flexible',
    contact: '209-831-6200 | parks@cityoftracy.org',
    applyUrl: 'https://www.cityoftracy.org',
  },
  {
    id: '10',
    organization: 'Living Grace Senior Care',
    cause: 'Seniors',
    description:
      'Conduct activities, read aloud, play games, and provide companionship. Must love working with people and feel comfortable with the elderly.',
    commitment: '2–4 hours/week',
    contact: '209-833-2200',
  },
];

export const volunteerCauses = [
  'All',
  'Environment',
  'Youth',
  'Seniors',
  'Food Access',
  'Animals',
  'Homelessness',
  'Arts',
  'Community',
];

export const donationOrgs = [
  {
    id: '1',
    name: 'Tracy Community Connections Center',
    description:
      'As a 501(c)(3) nonprofit, TCCC relies on generous donors to continue offering critical services to those experiencing homelessness in Tracy.',
    impact: [
      'Provide clean showers and essential hygiene products',
      'Fund street outreach team and case managers',
      'Support emergency resources like motel stays and transportation',
    ],
    donateUrl: 'https://tracyccc.org/donate',
  },
  {
    id: '2',
    name: 'Tracy Interfaith Ministries',
    description:
      'Your donation supports emergency food distribution, clothing for families, utility bill assistance, and holiday meals for those in need.',
    impact: [
      "Distribute meals' worth of groceries every month",
      'Rescue food from grocery stores to reduce waste',
      'Provide backpacks with school supplies to children',
    ],
    donateUrl: 'https://tracyinterfaith.org',
  },
  {
    id: '3',
    name: 'A To Z Psychotherapy',
    description:
      'Help provide accessible mental health services and education to at-risk women and children in order to strengthen communities and families.',
    impact: [
      'Fund individual and group therapy sessions',
      'Support child and adolescent therapy programs',
      'Train the next generation of helping professionals',
    ],
    donateUrl: 'https://www.atozpsychotherapy.org',
  },
];

export const tutors = [
  {
    id: '1',
    name: 'Boys & Girls Club Homework Help',
    subjects: ['All Subjects'],
    gradeLevels: 'K–8',
    availability: 'Mon–Thu, 3:00–6:00 PM',
    cost: 'Free',
    description: 'After-school homework support and tutoring in a supervised, supportive environment with trained staff.',
    contact: '209-832-2582',
  },
  {
    id: '2',
    name: 'Give Every Child a Chance',
    subjects: ['Math', 'Reading'],
    gradeLevels: 'K–12',
    availability: 'Flexible scheduling',
    cost: 'Free',
    description: 'One-on-one and small group tutoring focused on building foundational math and reading skills.',
    contact: '209-823-6222',
  },
  {
    id: '3',
    name: 'T & J Educational Tutoring',
    subjects: ['STEM', 'Science', 'Technology', 'Engineering', 'Math'],
    gradeLevels: 'K–12',
    availability: 'By appointment',
    cost: 'Low-cost',
    description: 'Specialized STEM tutoring with hands-on activities and real-world applications to spark curiosity.',
    contact: '209-914-5800',
  },
  {
    id: '4',
    name: 'Tracy Library Homework Help',
    subjects: ['All Subjects'],
    gradeLevels: 'K–12',
    availability: 'Mon–Thu, 4:00–6:00 PM',
    cost: 'Free',
    description: 'Drop-in homework assistance at the Tracy Branch Library with volunteer tutors and library staff.',
    contact: '209-831-4255',
  },
];

export const skills = [
  {
    id: '1',
    skill: 'Bike Repair',
    category: 'Home Repair',
    description:
      'Can fix flat tires, adjust brakes, replace chains, and perform basic bike maintenance. Have tools and experience.',
    availability: 'Weekends, 9 AM – 5 PM',
    contact: 'bikehelper.tracy@email.com',
  },
  {
    id: '2',
    skill: 'Basic Plumbing',
    category: 'Home Repair',
    description: 'Leaky faucets, clogged drains, running toilets, and minor pipe repairs. Licensed handyman with 10+ years experience.',
    availability: 'Evenings & weekends',
    contact: 'plumbing.tracy@email.com',
  },
  {
    id: '3',
    skill: 'Tech Help',
    category: 'Tech Help',
    description:
      'Smartphone setup, computer troubleshooting, WiFi setup, printer connections, and basic software help. Patient and friendly.',
    availability: 'Flexible — call to schedule',
    contact: 'techhelp.tracy@email.com',
  },
  {
    id: '4',
    skill: 'ESL Tutoring',
    category: 'Education',
    description: 'Conversational English practice for beginners and intermediate learners. Bilingual in Spanish and English.',
    availability: 'Weekends, 10 AM – 4 PM',
    contact: 'esl.tracy@email.com',
  },
];

export const skillCategories = ['Home Repair', 'Transportation', 'Tech Help', 'Education', 'Arts', 'Fitness', 'Other'];

export const sourceGroups = [
  {
    title: 'Community Resources & Organizations',
    sources: [
      'Tracy Interfaith Ministries. (2026). Emergency food and clothing services. https://tracyinterfaith.org',
      'Tracy Community Connections Center. (2026). Homelessness services in Tracy, CA. https://tracyccc.org',
      'City of Tracy. (2026). Parks, recreation, and community services. https://www.cityoftracy.org',
      'Lolly Hansen Senior Center. (2026). Senior programs and resources. https://www.cityoftracy.org/our-city/departments/parks-recreation-department/seniors',
      'San Joaquin County Human Services Agency. (2026). Community support services. https://www.sjgov.org/hsa',
    ],
  },
  {
    title: 'Mental Health Resources',
    sources: [
      'A To Z Psychotherapy. (2025). Mental health services for women and children. https://www.atozpsychotherapy.org',
      'Mindpath Health. (2026). Psychiatrists and therapists in Tracy, CA. https://www.mindpath.com/provider/psychiatrist/ca/tracy',
      'Psychology Today. (2026). Verified therapists in Tracy, CA. https://www.psychologytoday.com/us/therapists/ca/tracy',
      "Razan's Therapy Services. (2026). Individual and couples counseling in Tracy, CA. https://razanstherapeuticservices.com",
      '988 Suicide & Crisis Lifeline. (2026). https://988lifeline.org',
      'Crisis Text Line. (2026). https://www.crisistextline.org',
    ],
  },
  {
    title: 'Events & Activities',
    sources: [
      'City of Tracy. (2026). City calendar and events. https://www.cityoftracy.org/I-Want-To/View/City-Calendar',
      'Tracy Earth Project. (2026). Annual Earth Day event. https://tracyearthproject.org',
      'Tracy Connects. (2026). Community resource fair. https://www.tracyconnects.com',
      'Eventbrite. (2026). Tracy, CA events and calendar. https://www.eventbrite.com/d/ca--tracy/events',
      'Tracy Community Band. (2026). Concert schedule. https://atthegrand.org/events/tracy-community-band',
    ],
  },
  {
    title: 'Volunteer & Nonprofit Organizations',
    sources: [
      'Animal Rescue of Tracy. (2026). Volunteer programs. https://www.animalrescuetracy.org/volunteering',
      'Tracy Interfaith Ministries. (2026). Volunteer opportunities. https://tracyinterfaith.org',
      'Tracy Grand Theater Center for the Arts. (2026). Volunteer program. https://atthegrand.org',
      'GreatNonprofits. (2026). Nonprofits and charities in Tracy, CA. https://greatnonprofits.org/city/tracy/CA',
      'Tracy Community Connections Center. (2026). Volunteer and donation information. https://tracyccc.org/get-involved',
      'Tracy Earth Project. (2026). Volunteer opportunities. https://tracyearthproject.org',
    ],
  },
  {
    title: 'Youth & Education Programs',
    sources: [
      'Boys & Girls Club of Tracy. (2026). After-school programs and tutoring. https://www.bgca.org',
      'Give Every Child a Chance. (2026). Free tutoring services. https://www.gecac.net',
      'Tracy Unified School District. (2026). Community education programs.',
    ],
  },
  {
    title: 'Images & Media',
    sources: [
      'All photographs and illustrations were generated by the team using AI image generation tools.',
      'Icons in the original React build used Lucide (MIT). This static version uses simple inline SVGs for the same visual cues.',
    ],
  },
];
