import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import nirfRoutes from "./routes/website/nirf/nirfRoutes.js";
import nbaNaacRoutes from "./routes/website/nbaNaacRoutes.js";
import deptHomeRoutes from "./routes/website/department/deptHomeRoutes.js";
import compActivityRoutes from "./routes/website/homepage/compActivityRoutes.js";
import profileRoutes from "./routes/website/profileRoutes.js";
import studentcornerRoutes from "./routes/website/studentcorner/studentcornerRoutes.js";
import { roleHierarchyController } from "./controllers/website/contentApprovalController.js";
import facultyStaffRoute from "./routes/website/facultyStaffRoutes.js";

// Import new department routes
import computerRoutes from "./routes/website/department/computerRoutes.js";
import mechanicalRoutes from "./routes/website/department/mechanicalRoutes.js";
import electricalRoutes from "./routes/website/department/electricalRoutes.js";
import extcRoutes from "./routes/website/department/extcRoutes.js";
import cseRoutes from "./routes/website/department/cseRoutes.js";
import bshRoutes from "./routes/website/department/bshRoutes.js";

// Import department PDF routes
import deptPdfRoutes from "./routes/website/deptPdfRoutes.js";

// Import HOD desk routes
import hodDeskRoutes from "./routes/website/hodDeskRoutes.js";

// Import content approval routes
import contentApprovalRoutes from "./routes/website/contentApprovalRoutes.js";

// Import activity logs routes
import activityLogsRoutes from "./routes/admin/activityLogsRoutes.js";

// Import logging middleware
import adminActivityLogger from "./middlewares/loggingMiddleware.js";

import iicRoutes from "./routes/website/iicRoutes.js";

dotenv.config();

const port = process.env.port;
const app = express();

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3663",
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  session({
    name: "connect.sid",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' folder
app.use("/cdn", express.static(path.join(__dirname, "public", "cdn")));

// Add admin activity logging middleware (after session, before routes)
app.use(adminActivityLogger);

// Integrate IIC routes
// app.use("/api/iic", iicRoutes);
// Root test route
app.get("/", (req, res) => {
  res.send("API Server is running");
});

// Routes
app.use("/", routes);
app.use("/api/nirf", nirfRoutes);
app.use("/api/nba-naac", nbaNaacRoutes);
app.use("/api/department", deptHomeRoutes); //Working
app.use("/api/department", compActivityRoutes); //Not in Use But Clint had created this
app.use("/api/profile", profileRoutes);
app.use("/api/studentcorner", studentcornerRoutes);

// New department routes
app.use("/api/department/home", computerRoutes); //Wprking
// app.use("/api/department/mechanical", mechanicalRoutes);
// app.use("/api/department/electrical", electricalRoutes);
// app.use("/api/department/extc", extcRoutes);
// app.use("/api/department/cse", cseRoutes);
// app.use("/api/department/bsh", bshRoutes);

// Department PDF routes (for all departments and sections)
// app.use("/api/department", deptPdfRoutes);

// HOD desk routes
app.use("/api/hod-desk", hodDeskRoutes);

// Content approval routes
// app.use("/api/content-approval", contentApprovalRoutes);
app.use("/api/role-hierarchy", roleHierarchyController);
app.use("/api/content-approval", contentApprovalRoutes);

// Integrate IIC routes
app.use("/api/iic", iicRoutes);

//Manage Faculty Staff Routes
app.use("/api/faculties", facultyStaffRoute);

// Activity logs routes
app.use("/api/activity-logs", activityLogsRoutes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});
