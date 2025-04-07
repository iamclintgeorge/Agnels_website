// Authentication middleware

/**
 * Middleware to check if user is authenticated
 */
export const authMiddleware = (req, res, next) => {
  // Check if user is authenticated through session
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else if (process.env.NODE_ENV === 'development' && process.env.BYPASS_AUTH === 'true') {
    // Optional: Allow bypassing auth in development for testing
    console.warn('Auth middleware bypassed in development mode!');
    next();
  } else {
    // User is not authenticated
    res.status(401).json({ error: 'Authentication required' });
  }
};

/**
 * Middleware to check user role
 * @param {Array} roles - Array of allowed roles
 */
export const checkRole = (roles) => {
  return (req, res, next) => {
    // First check if user is authenticated
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Then check if user has required role
    const userRole = req.session.user.role;
    
    if (roles.includes(userRole)) {
      // User has one of the required roles
      next();
    } else if (process.env.NODE_ENV === 'development' && process.env.BYPASS_ROLE_CHECK === 'true') {
      // Optional: Allow bypassing role check in development for testing
      console.warn(`Role check bypassed in development mode! Required roles: ${roles.join(', ')}, User role: ${userRole}`);
      next();
    } else {
      // User doesn't have required role
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
  };
}; 