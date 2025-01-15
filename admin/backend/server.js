import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import session from "express-session";
dotenv.config();

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

// Routes
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});
