import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import logger from "./services/logger.js";
import { v4 as uuidv4 } from "uuid";
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
import researchRoutes from "./routes/website/homepage/research/researchRoutes.js";

// Import new department routes
import computerRoutes from "./routes/website/department/computerRoutes.js";
import mechanicalRoutes from "./routes/website/department/mechanicalRoutes.js";
import electricalRoutes from "./routes/website/department/electricalRoutes.js";
import extcRoutes from "./routes/website/department/extcRoutes.js";
import cseRoutes from "./routes/website/department/cseRoutes.js";
import bshRoutes from "./routes/website/department/bshRoutes.js";

// Import department PDF routes
import staticPdfRoutes from "./routes/website/staticPdfRoutes.js";

// Import HOD desk routes
import hodDeskRoutes from "./routes/website/hodDeskRoutes.js";

// Import content approval routes
import contentApprovalRoutes from "./routes/website/contentApprovalRoutes.js";

// Import activity logs routes
import activityLogsRoutes from "./routes/admin/activityLogsRoutes.js";

// Import logging middleware
// import adminActivityLogger from "./middlewares/loggingMiddleware.js";

import iicRoutes from "./routes/website/iicRoutes.js";

dotenv.config();

const port = process.env.port;
const app = express();

// Allowed hosts (only fcrit.ac.in for your use case)
const ALLOWED_HOSTS = new Set([
  "fcrit.ac.in",
]);

// Simple private IP guard
const isPrivateHost = (hostname) => {
  const ipV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  const ipV6 = /^[a-f0-9:]+$/i.test(hostname) && hostname.includes(":");
  if (ipV4 || ipV6) return true;
  if (hostname === "localhost" || hostname.endsWith(".local")) return true;
  return false;
};
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
app.use("/api/department/research", researchRoutes);

app.get("/api/image-proxy", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).send("Missing or invalid url");
    }

    // Validate URL
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return res.status(400).send("Invalid URL");
    }

    // Enforce protocol
    if (!["https:", "http:"].includes(parsed.protocol)) {
      return res.status(400).send("Unsupported protocol");
    }

    // Disallow private/localhost and require allowlisted hosts
    if (isPrivateHost(parsed.hostname) || !ALLOWED_HOSTS.has(parsed.hostname)) {
      return res.status(403).send("Host not allowed");
    }

    // Fetch with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const upstream = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    }).catch((e) => {
      if (e.name === "AbortError") return { ok: false, status: 504 };
      throw e;
    });
    clearTimeout(timeout);

    if (!upstream || !upstream.ok) {
      return res.status(upstream?.status || 502).send("Upstream error");
    }

    // Restrict to images only
    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return res.status(415).send("Unsupported media type");
    }

    // CORS and security headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Pass through ETag if available
    const etag = upstream.headers.get("etag");
    if (etag) res.setHeader("ETag", etag);

    // Stream response (memory efficient)
    if (upstream.body && upstream.body.pipe) {
      upstream.body.pipe(res);
    } else {
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.send(buf);
    }
  } catch (e) {
    console.error("Image proxy error:", e);
    if (!res.headersSent) res.status(500).send("Proxy error");
  }
});

// New department routes
app.use("/api/department/home", computerRoutes); //Wprking
// app.use("/api/department/mechanical", mechanicalRoutes);
// app.use("/api/department/electrical", electricalRoutes);
// app.use("/api/department/extc", extcRoutes);
// app.use("/api/department/cse", cseRoutes);
// app.use("/api/department/bsh", bshRoutes);

// Department PDF routes (for all departments and sections)
app.use("/api/static-files", staticPdfRoutes);

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
app.use("/api/logs", activityLogsRoutes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
  logger.info("Server started", {
    id: uuidv4(), // Use a UUID or other method to generate an ID
    title: `Server started at http://localhost:${port}/`,
    service: "fcrit backend server",
    description: "No additional info",
    level: "INFO",
    created_by: "system",
    source_ip: "N/A", // You can fetch the IP dynamically if needed
    created_on: new Date().toISOString(),
  });
});
