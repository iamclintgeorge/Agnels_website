export const authMiddleware = (req, res, next) => {
  const sessionId = req.cookies["connect.sid"];

  if (!sessionId || !req.session || !req.session.user) {
    console.log("sessionId not found in authMiddleware");
    //     console.log(
    //   "sessionId not found in authMiddleware",
    //   "sessionId:",
    //   sessionId,
    //   "req.session:",
    //   req.session,
    //   "req.session.user:",
    //   req.session.user
    // );
    return res.status(401).json({ message: "You are not authenticated" });
  }

  req.user = req.session.user;
  next();
};

export const checkAuth = (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
};

export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Super admin has all permissions
    if (
      req.user.role === "superAdmin" ||
      req.user.permissions.includes("all")
    ) {
      return next();
    }

    // Check if user has the required permission
    if (!req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Access forbidden - You don't have the required permission",
      });
    }

    next();
  };
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden - Invalid role" });
    }

    next();
  };
};
