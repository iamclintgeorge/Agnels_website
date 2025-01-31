import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/admin/userRoutes.js";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();
import homeRoutes from "./routes/website/homepage/homeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const port = process.env.port;

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
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

// Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", userRoutes);
app.use("/api/home", homeRoutes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});
