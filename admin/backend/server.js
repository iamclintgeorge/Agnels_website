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

// Import new department routes
import computerRoutes from "./routes/website/department/computerRoutes.js";
import mechanicalRoutes from "./routes/website/department/mechanicalRoutes.js";
import electricalRoutes from "./routes/website/department/electricalRoutes.js";
import extcRoutes from "./routes/website/department/extcRoutes.js";
import cseRoutes from "./routes/website/department/cseRoutes.js";
import bshRoutes from "./routes/website/department/bshRoutes.js";

// Import department PDF routes
import deptPdfRoutes from "./routes/website/deptPdfRoutes.js";

// import iicRoutes from "./routes/website/iicRoutes.js";

dotenv.config();

const port = process.env.port;
const app = express();

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
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
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

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
app.use("/api/department", deptHomeRoutes);
app.use("/api/department", compActivityRoutes);
app.use("/api/profile", profileRoutes);

// New department routes
app.use("/api/department/computer", computerRoutes);
app.use("/api/department/mechanical", mechanicalRoutes);
app.use("/api/department/electrical", electricalRoutes);
app.use("/api/department/extc", extcRoutes);
app.use("/api/department/cse", cseRoutes);
app.use("/api/department/bsh", bshRoutes);

// Department PDF routes (for all departments and sections)
app.use("/api/department", deptPdfRoutes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});
