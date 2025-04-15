// import express from "express";
// import {
//   signupController,
//   loginController,
//   logoutController,
// } from "../../controllers/admin/userController.js";
// import { authMiddleware, checkRole } from "../../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post("/signup", signupController);
// router.post("/login", loginController);
// router.post("/signout", logoutController);
// router.get("/check-auth", authMiddleware);


// router.get(
//   "/student",
//   authMiddleware,
//   checkRole(["superAdmin", "teach_staff","hod"]),
//   (req, res) => {
//     res.status(200).json({ message: "Welcome, Teacher!" });
//     console.log("/student router");
//   }
// );

// export default router;


import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/admin/userController.js";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/signout", logoutController);

router.get("/check-auth", (req, res) => {
  console.log("Handling /api/check-auth"); // Debug log
  if (req.session && req.session.user) {
    return res.status(200).json({
      authenticated: true,
      user: req.session.user,
    });
  }
  return res.status(401).json({ authenticated: false });
});

router.get(
  "/student",
  authMiddleware,
  checkRole(["superAdmin", "teach_staff", "hod"]),
  (req, res) => {
    res.status(200).json({ message: "Welcome, Teacher!" });
    console.log("/student router");
  }
);

export default router;