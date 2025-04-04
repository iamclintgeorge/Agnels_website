import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session";
// import userRoutes from "./routes/admin/userRoutes.js";
// import homeRoutes from "./routes/website/homepage/homeRoutes.js";
// import aboutusRoutes from "./routes/website/homepage/aboutusRoutes.js";
// import trainingPlacementRoutes from "./routes/trainingPlacement.js";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";

dotenv.config();

const port = process.env.port || 3663;
const app = express();

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Session configuration - MUST come before CORS
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
app.use(
  session({
    name: "connect.sid",
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: ONE_DAY
    }
  })
);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('Cookies:', req.cookies);
  next();
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/documents", express.static(path.join(__dirname, "uploads", "documents")));
app.use("/uploads/images", express.static(path.join(__dirname, "uploads", "images")));

// Routes
app.use("/", routes);

// app.use("/api", userRoutes);
// app.use("/api/home", homeRoutes);
// app.use("/api/training-placement", trainingPlacementRoutes);
// app.use("/api/aboutus", aboutusRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
  console.log(`Login test page available at: http://localhost:${port}/login-test.html`);
});
