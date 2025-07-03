export const PERMISSIONS_CONFIG = {
  dashboard: {
    roles: ["all"],
    description: "Access to dashboard",
  },
  home_page: {
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
    description: "Manage home page content",
  },
  about_us: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage about us section",
  },
  "departments.computer-engineering": {
    roles: ["superAdmin", "compHod"],
    description: "Manage Computer Engineering department",
  },
  "departments.mechanical-engineering": {
    roles: ["superAdmin", "mechHod"],
    description: "Manage Mechanical Engineering department",
  },
  "departments.extc": {
    roles: ["superAdmin", "extcHod"],
    description: "Manage EXTC department",
  },
  "departments.electrical-engineering": {
    roles: ["superAdmin", "electricalHod"],
    description: "Manage Electrical Engineering department",
  },
  "departments.computer-science-and-engineering": {
    roles: ["superAdmin", "itHod"],
    description: "Manage CSE department",
  },
  "departments.basic-science-and-humanities": {
    roles: ["superAdmin", "bshHod"],
    description: "Manage BSH department",
  },
  admission: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage admissions",
  },
  academics: {
    roles: ["superAdmin", "principal", "admin", "teach_staff"],
    description: "Manage academics",
  },
  training_placement: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage training and placement",
  },
  students_corner: {
    roles: ["superAdmin", "teach_staff", "principal"],
    description: "Manage students corner",
  },
  research: {
    roles: ["superAdmin", "principal", "teach_staff"],
    description: "Manage research content",
  },
  human_resource: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage human resources",
  },
  alumni: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage alumni section",
  },
  downloads: {
    roles: ["superAdmin", "principal", "admin"],
    description: "Manage downloads",
  },
  manage_users: {
    roles: ["superAdmin", "compHod"], // HODs can manage users in their department
    description: "User management",
  },
  nirf: {
    roles: ["superAdmin", "admin"],
    description: "Manage NIRF content",
  },
  nba_naac: {
    roles: ["superAdmin", "admin"],
    description: "Manage NBA/NAAC content",
  },
  logs: {
    roles: ["superAdmin"],
    description: "View system logs",
  },
};
