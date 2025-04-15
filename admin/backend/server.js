


// // admin/backend/server.js
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRoutes from "./routes/admin/userRoutes.js";
// import dotenv from "dotenv";
// import session from "express-session";
// import homeRoutes from "./routes/website/homepage/homeRoutes.js";
// import aboutusRoutes from "./routes/website/homepage/aboutusRoutes.js";
// import researchRoutes from "./routes/website/homepage/research/researchRoutes.js";
// import trainingPlacementRoutes from "./routes/trainingPlacement.js";
// import path from "path";
// import { fileURLToPath } from "url";

// dotenv.config();

// const port = process.env.port;
// const app = express();

// // Middleware to log all incoming requests
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Middlewares
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(
//   session({
//     name: "connect.sid",
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

// // Get the current directory path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static files from the 'public' folder
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// // Test route to confirm the server is working
// app.get("/api/test", (req, res  ) => {
//   res.json({ message: "Test route working" });
// });

// // Routes
// app.use("/api", userRoutes);
// app.use("/api/home", homeRoutes);
// app.use("/api/research", researchRoutes);
// app.use("/api/training-placement", trainingPlacementRoutes);
// app.use("/api/aboutus", aboutusRoutes);

// // Catch-all middleware for 404 errors (should be the last middleware)
// app.use((req, res, next) => {
//   console.log(`Route not found: ${req.method} ${req.url}`);
//   res.status(404).json({ message: "Route not found" });
// });

// // Error-handling middleware (should be the last middleware)
// app.use((err, req, res, next) => {
//   console.error("Error:", err.stack);
//   if (!res.headersSent) {
//     res.status(500).json({ message: "Something went wrong!" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server Started at URI http://localhost:${port}/`);
// });

// app.use("/api", userRoutes);



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/admin/userRoutes.js";
import dotenv from "dotenv";
import session from "express-session";
import homeRoutes from "./routes/website/homepage/homeRoutes.js";
import aboutusRoutes from "./routes/website/homepage/aboutusRoutes.js";
import researchRoutes from "./routes/website/homepage/research/researchRoutes.js";
import trainingPlacementRoutes from "./routes/trainingPlacement.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.port;
const app = express();

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working" });
});

app.use("/api", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/training-placement", trainingPlacementRoutes);
app.use("/api/aboutus", aboutusRoutes);

app.use((req, res, next) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  if (!res.headersSent) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});



// app.listen(port, () => {
//   console.log(`Server Started at URI http://localhost:${port}/`);
// });

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
  console.log(
    app._router.stack
      .filter((r) => r.route)
      .map((r) => `${Object.keys(r.route.methods)} ${r.route.path}`)
  );
});
