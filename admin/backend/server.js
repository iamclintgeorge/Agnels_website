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

app.listen(port, () => {
  console.log(`Server Started at URI http://localhost:${port}/`);
});

// ,
// ,
// ,
// ,
//The Below Code is has integration of Node Cluster and Redis. To be used only if Redis is allowed to be used by the System Administrator

// ,
// ,

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import session from "express-session";
// import { createClient } from "redis";
// import { RedisStore } from "connect-redis"; // Changed from default import to named import
// import path from "path";
// import { fileURLToPath } from "url";
// import routes from "./routes/routes.js";
// import nirfRoutes from "./routes/website/nirf/nirfRoutes.js";
// import nbaNaacRoutes from "./routes/website/nbaNaacRoutes.js";
// import deptHomeRoutes from "./routes/website/department/deptHomeRoutes.js";
// import compActivityRoutes from "./routes/website/homepage/compActivityRoutes.js";
// import profileRoutes from "./routes/website/profileRoutes.js";
// import cluster from "cluster";
// import os from "os";

// dotenv.config();

// const port = process.env.port || 3000;
// const numCPUs = os.cpus().length; // Number of CPU cores
// const app = express();

// // Set up Redis client
// const redisClient = createClient({
//   socket: {
//     host: "localhost", // Redis server address
//     port: 6379, // Redis default port
//   },
// });

// redisClient
//   .connect()
//   .catch((err) => console.log("Redis connection error:", err));

// if (cluster.isPrimary) {
//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork(); // Fork a worker for each CPU core
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   // Worker process logic (your Express server setup)

//   // Middlewares
//   app.use(
//     cors({
//       origin: function (origin, callback) {
//         const allowedOrigins = [
//           "http://localhost:5173",
//           "http://localhost:5174",
//         ];
//         if (allowedOrigins.includes(origin) || !origin) {
//           callback(null, true);
//         } else {
//           callback(new Error("Not allowed by CORS"));
//         }
//       },
//       methods: ["POST", "GET", "PUT", "DELETE"],
//       credentials: true,
//     })
//   );
//   app.use(cookieParser());
//   app.use(express.json({ limit: "50mb" }));
//   app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//   // Use Redis session store
//   app.use(
//     session({
//       store: new RedisStore({ client: redisClient }), // RedisStore usage remains the same
//       secret: "secret",
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         httpOnly: true,
//         secure: false, // Set to true if using HTTPS
//         sameSite: "Lax",
//         maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//       },
//     })
//   );

//   // Get the current directory path
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   // Serve static files from the 'public' folder
//   app.use(
//     "/uploads",
//     express.static(path.join(__dirname, "public", "uploads"))
//   );

//   // Root test route
//   app.get("/", (req, res) => {
//     res.send("API Server is running");
//   });

//   // Routes
//   app.use("/", routes);
//   app.use("/api/nirf", nirfRoutes);
//   app.use("/api/nba-naac", nbaNaacRoutes);
//   app.use("/api/department", deptHomeRoutes);
//   app.use("/api/department", compActivityRoutes);
//   app.use("/api/profile", profileRoutes);

//   // Start the server in the worker process
//   app.listen(port, () => {
//     console.log(
//       `Server started at http://localhost:${port}/ (PID: ${process.pid})`
//     );
//   });
// }
