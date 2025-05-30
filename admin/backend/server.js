import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import iicRoutes from "./routes/website/iicRoutes.js"; // Import IIC routes

dotenv.config();

const port = process.env.port || 3663; // Default port if not defined in .env
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
      secure: false, // Use true if you're working with HTTPS in production
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
app.use("/api/iic", iicRoutes);  // Add the IIC routes here

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});
