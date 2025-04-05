export const authMiddleware = (req, res, next) => {
  // console.log("Cookies:", req.cookies);
  const sessionId = req.cookies["connect.sid"];
  // console.log("Session ID in cookie:", sessionId);
  // console.log("req.session", req.session);
  // console.log("req.session.user", req.session.user);
  //Sample text to check if the Detached Head is pushed to the main codebase..

  if (!sessionId || !req.session || !req.session.user) {
    console.log("sessionId not found in authMiddleware");
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
