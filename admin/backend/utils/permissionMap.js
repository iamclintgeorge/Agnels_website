// Define permission requirements for each route
export const routePermissions = {
  // Home routes
  "/api/home": "home_page",

  // Department routes
  "/api/department/computer": "departments.computer-engineering",
  "/api/department/mechanical": "departments.mechanical-engineering",
  "/api/department/extc": "departments.extc",
  "/api/department/electrical": "departments.electrical-engineering",
  "/api/department/cse": "departments.computer-science-and-engineering",
  "/api/department/bsh": "departments.basic-science-and-humanities",

  // Department management routes (new system)
  "/api/dept": "department_management",

  // Other content routes
  "/api/aboutus": "about_us",
  "/api/academic": "academics",
  "/api/training-placement": "training_placement",
  "/api/research": "research",
  "/api/humanResource": "human_resource",
  "/api/nirf": "nirf",
  "/api/nba-naac": "nba_naac",

  // Admin routes
  "/api/users": "manage_users",
  "/api/logs": "logs",
  
  // Faculty routes
  "/api/faculty": "faculty_management",
  
  // Infrastructure routes
  "/api/infrastructure": "infrastructure_management",
  
  // Role management routes
  "/api/roles": "role_management",
};

// Define role-based access
export const roleBasedAccess = {
  superAdmin: ["all"],
  compHod: [
    "dashboard",
    "home_page",
    "departments.computer-engineering",
    "manage_users",
    "faculty_management",
    "infrastructure_management",
    "department_management",
  ],
  mechHod: [
    "dashboard", 
    "home_page", 
    "departments.mechanical-engineering", 
    "faculty_management", 
    "infrastructure_management",
    "department_management",
  ],
  extcHod: [
    "dashboard", 
    "home_page", 
    "departments.extc", 
    "faculty_management", 
    "infrastructure_management",
    "department_management",
  ],
  bshHod: [
    "dashboard",
    "home_page",
    "departments.basic-science-and-humanities",
    "faculty_management",
    "infrastructure_management",
    "department_management",
  ],
  cseHod: [
    "dashboard",
    "home_page",
    "departments.computer-science-and-engineering",
    "faculty_management",
    "infrastructure_management",
    "department_management",
  ],
  electricalHod: [
    "dashboard",
    "home_page",
    "departments.electrical-engineering",
    "faculty_management",
    "infrastructure_management",
    "department_management",
  ],
  teach_staff: ["dashboard", "home_page", "students_corner"],
  non_teach_staff: ["dashboard", "home_page"],
  principal: [
    "dashboard", 
    "home_page", 
    "about_us", 
    "academics", 
    "research", 
    "faculty_management", 
    "infrastructure_management", 
    "role_management",
    "department_management",
  ],
};
