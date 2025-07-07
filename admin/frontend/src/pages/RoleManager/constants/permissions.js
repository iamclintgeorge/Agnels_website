export const availablePermissions = [
  // Core permissions
  { id: "dashboard", name: "Dashboard Access", category: "core" },
  { id: "all", name: "All Permissions (Super Admin)", category: "core" },

  // Content management permissions
  { id: "home_page", name: "Home Page Management", category: "content" },
  { id: "about_us", name: "About Us Management", category: "content" },
  { id: "admission", name: "Admission Management", category: "content" },
  { id: "academics", name: "Academics Management", category: "content" },
  { id: "training_placement", name: "Training & Placement", category: "content" },
  { id: "students_corner", name: "Students Corner", category: "content" },
  { id: "research", name: "Research & Publication", category: "content" },
  { id: "human_resource", name: "Human Resource", category: "content" },
  { id: "alumni", name: "Alumni Page", category: "content" },
  { id: "downloads", name: "Downloads Page", category: "content" },
  { id: "nirf", name: "NIRF Management", category: "content" },
  { id: "nba_naac", name: "NBA/NAAC Management", category: "content" },

  // Department permissions
  {
    id: "departments.computer-engineering",
    name: "Computer Engineering Department",
    category: "departments",
  },
  {
    id: "departments.mechanical-engineering",
    name: "Mechanical Engineering Department",
    category: "departments",
  },
  { 
    id: "departments.extc", 
    name: "EXTC Department", 
    category: "departments" 
  },
  {
    id: "departments.electrical-engineering",
    name: "Electrical Engineering Department",
    category: "departments",
  },
  {
    id: "departments.computer-science-and-engineering",
    name: "Computer Science Engineering Department",
    category: "departments",
  },
  {
    id: "departments.basic-science-and-humanities",
    name: "Basic Science & Humanities Department",
    category: "departments",
  },

  // Administrative permissions
  { id: "manage_users", name: "User Management", category: "admin" },
  { id: "role_management", name: "Role & Permission Management", category: "admin" },
  { id: "logs", name: "System Logs", category: "admin" },
  { id: "faculty_management", name: "Faculty Management", category: "admin" },
  { id: "content_approval", name: "Content Approval", category: "admin" },

  // Special permissions
  { id: "bulk_operations", name: "Bulk Operations", category: "special" },
  { id: "system_settings", name: "System Settings", category: "special" },
  { id: "backup_restore", name: "Backup & Restore", category: "special" },
];

export const permissionCategories = {
  core: "Core System",
  content: "Content Management",
  departments: "Department Access", 
  admin: "Administrative",
  special: "Special Operations",
};

export const defaultRoles = [
  {
    id: 1,
    name: "superAdmin",
    displayName: "Super Admin",
    permissions: ["all"],
    isSystemRole: true,
  },
  {
    id: 2,
    name: "compHod",
    displayName: "HOD (Computer Engineering)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.computer-engineering",
      "manage_users",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 3,
    name: "mechHod",
    displayName: "HOD (Mechanical Engineering)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.mechanical-engineering",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 4,
    name: "extcHod",
    displayName: "HOD (EXTC)",
    permissions: [
      "dashboard", 
      "home_page", 
      "departments.extc",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 5,
    name: "bshHod",
    displayName: "HOD (Basic Science & Humanities)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.basic-science-and-humanities",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 6,
    name: "cseHod",
    displayName: "HOD (Computer Science Engineering)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.computer-science-and-engineering",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 7,
    name: "electricalHod",
    displayName: "HOD (Electrical Engineering)",
    permissions: [
      "dashboard",
      "home_page",
      "departments.electrical-engineering",
      "faculty_management",
    ],
    isSystemRole: false,
  },
  {
    id: 8,
    name: "teach_staff",
    displayName: "Teaching Staff",
    permissions: ["dashboard", "home_page", "students_corner"],
    isSystemRole: false,
  },
  {
    id: 9,
    name: "non_teach_staff",
    displayName: "Non-Teaching Staff",
    permissions: ["dashboard", "home_page"],
    isSystemRole: false,
  },
  {
    id: 10,
    name: "principal",
    displayName: "Principal",
    permissions: [
      "dashboard",
      "home_page",
      "about_us",
      "academics",
      "research",
      "faculty_management",
    ],
    isSystemRole: false,
  },
]; 