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
};

// Define role-based access
export const roleBasedAccess = {
  superAdmin: ["all"],
  compHod: [
    "dashboard",
    "home_page",
    "departments.computer-engineering",
    "manage_users",
  ],
  mechHod: ["dashboard", "home_page", "departments.mechanical-engineering"],
  extcHod: ["dashboard", "home_page", "departments.extc"],
  bshHod: [
    "dashboard",
    "home_page",
    "departments.basic-science-and-humanities",
  ],
  cseHod: [
    "dashboard",
    "home_page",
    "departments.computer-science-and-engineering",
  ],
  electricalHod: [
    "dashboard",
    "home_page",
    "departments.electrical-engineering",
  ],
  teach_staff: ["dashboard", "home_page", "students_corner"],
  non_teach_staff: ["dashboard", "home_page"],
  principal: ["dashboard", "home_page", "about_us", "academics", "research"],
};
