export const departmentSections = [
  "Carousel",
  "Committees and Board of Studies",
  "Activities",
  "Infrastructure",
  "Student Association",
  "Magazine",
  "Syllabus",
  // "Result Analysis",
  "Time Table",
  "Achievements",
  "Academic Calendar",
  "Innovative Teaching and Learning Methods",
  "Alumni Testimonials",
  "Publications",
  "Projects",
];

export const academicSections = [
  {
    Home: "home",
    "Academic Calendar": "academic_calendar",
    Examinations: "examinations",
    "Academic Links Management": "academic_links",
  },
];

export const aboutSections = [
  "History",
  "Vision and Mission",
  "Trustees",
  "Managing Director's Desk",
  "Principal's Desk",
  "Governance",
  "Audit Report and Affiliations",
  "Administrations and Committees",
  "Institute Roadmap",
  "Service Regulation",
  "Qualification and Eligibility norms for Recruitment",
  "Best Practices",
  "Mandatory Disclosures",
];

export const departments = [
  {
    id: "computer-engineering",
    name: "Computer Engineering",
    permission: "departments.computer-engineering",
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    permission: "departments.mechanical-engineering",
  },
  { id: "extc", name: "EXTC", permission: "departments.extc" },
  {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    permission: "departments.electrical-engineering",
  },
  {
    id: "computer-science-and-engineering",
    name: "Computer Science and Engineering",
    permission: "departments.computer-science-and-engineering",
  },
  {
    id: "basic-science-and-humanities",
    name: "Basic Science and Humanities",
    permission: "departments.basic-science-and-humanities",
  },
];

export const PERMISSIONS_CONFIG = {
  dashboard: { component: "dashboard", roles: ["all"] },
  home_page: {
    component: "home_page",
    roles: [
      "superAdmin",
      "compHod",
      "mechHod",
      "extcHod",
      "electricalHod",
      "itHod",
      "bshHod",
      "teach_staff",
      "principal",
    ],
  },
  about_us: {
    component: "about_us",
    roles: ["superAdmin", "principal", "admin"],
  },
  "departments.computer-engineering": {
    component: "departments",
    roles: ["superAdmin", "compHod"],
  },
  "departments.mechanical-engineering": {
    component: "departments",
    roles: ["superAdmin", "mechHod"],
  },
  "departments.extc": {
    component: "departments",
    roles: ["superAdmin", "extcHod"],
  },
  "departments.electrical-engineering": {
    component: "departments",
    roles: ["superAdmin", "electricalHod"],
  },
  "departments.computer-science-and-engineering": {
    component: "departments",
    roles: ["superAdmin", "itHod"],
  },
  "departments.basic-science-and-humanities": {
    component: "departments",
    roles: ["superAdmin", "bshHod"],
  },
  "hod-desk": {
    component: "hod-desk",
    roles: [
      "superAdmin",
      "compHod",
      "mechHod",
      "extcHod",
      "electricalHod",
      "itHod",
      "bshHod",
    ],
  },
  admission: {
    component: "admission",
    roles: ["superAdmin", "principal", "admin"],
  },
  academics: {
    component: "academics",
    roles: ["superAdmin", "principal", "admin"],
  },
  training_placement: {
    component: "training_placement",
    roles: ["superAdmin", "principal", "admin"],
  },
  students_corner: {
    component: "students_corner",
    roles: ["superAdmin", "teach_staff", "principal"],
  },
  research: {
    component: "research",
    roles: ["superAdmin", "principal", "teach_staff"],
  },
  human_resource: {
    component: "human_resource",
    roles: ["superAdmin", "principal", "admin"],
  },
  alumni: {
    component: "alumni",
    roles: ["superAdmin", "principal", "admin"],
  },
  downloads: {
    component: "downloads",
    roles: ["superAdmin", "principal", "admin"],
  },
  manage_users: {
    component: "manage_users",
    roles: ["superAdmin", "hod"],
  },
  nirf: {
    component: "nirf",
    roles: ["superAdmin", "admin"],
  },
  nba_naac: {
    component: "nba_naac",
    roles: ["superAdmin", "admin"],
  },
  iqac: {
    component: "iqac",
    roles: ["superAdmin", "admin", "principal"],
  },
  logs: {
    component: "logs",
    roles: ["superAdmin"],
  },
};
