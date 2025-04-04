export const authMiddleware = (req, res, next) => {
  console.log("Session:", req.session);
  console.log("Session user:", req.session?.user);
  
  // console.log("Cookies:", req.cookies);
  const sessionId = req.cookies["connect.sid"];
  // console.log("Session ID in cookie:", sessionId);

  if (!sessionId || !req.session || !req.session.user) {
    console.log("No session or user found");
    return res.status(401).json({ message: "You are not authenticated" });
  }

  // Set req.user for use in other middlewares
  req.user = req.session.user;
  next();
};

export const checkAuth = (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user,
  });
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
