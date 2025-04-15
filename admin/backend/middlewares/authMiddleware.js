// export const authMiddleware = (req, res, next) => {
//   console.log("Cookies:", req.cookies);
//   const sessionId = req.cookies["connect.sid"];
//   console.log("Session ID in cookie:", sessionId);
//   console.log("req.session", req.session);
//   console.log("req.session.user", req.session.user);  

//   if (!sessionId) {
//     console.log("sessionId not found in authMiddleware");
//     return res.status(401).json({ message: "You are not authenticated" });
//   }

//   if (req.session && req.session.user) {
//     res.status(200).json({
//       authenticated: true,
//       user: req.session.user,
//     });
//     // req.user = req.session.user;
//     return next();
//   } else {
//     console.log("Invalid session or user not found in session.");
//     return res
//       .status(401)
//       .json({ message: "You are not authenticated from backend" });
//   }
// };





// export const checkRole = (allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access forbidden" });
//     }

//     next();
//   };
// };

// export const authMiddleware = (req, res, next) => {
//   console.log("Cookies:", req.cookies);
//   const sessionId = req.cookies["connect.sid"];
//   console.log("Session ID in cookie:", sessionId);
//   console.log("req.session", req.session);
//   console.log("req.session.user", req.session.user);  

//   if (!sessionId) {
//     console.log("sessionId not found in authMiddleware");
//     return res.status(401).json({ message: "You are not authenticated" });
//   }

//   if (req.session && req.session.user) {
//     req.user = req.session.user; // Set user for downstream use
//     return next(); // Proceed without sending a response
//   } else {
//     console.log("Invalid session or user not found in session.");
//     return res
//       .status(401)
//       .json({ message: "You are not authenticated from backend" });
//   }
// };


export const authMiddleware = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const sessionId = req.cookies["connect.sid"];
  console.log("Session ID in cookie:", sessionId);
  console.log("req.session", req.session);
  console.log("req.session.user", req.session.user);

  if (!sessionId) {
    console.log("sessionId not found in authMiddleware");
    return res.status(401).json({ message: "You are not authenticated" });
  }

  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    console.log("Invalid session or user not found in session.");
    return res.status(401).json({ message: "You are not authenticated from backend" });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access forbidden" });
    }

    next();
  };
};