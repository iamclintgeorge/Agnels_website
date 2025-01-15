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
    return res.status(200).json({
      authenticated: true,
      user: req.session.user,
    });
    // req.user = req.session.user;
    // return next();
  } else {
    console.log("Invalid session or user not found in session.");
    return res
      .status(401)
      .json({ message: "You are not authenticated from backend" });
  }
};
