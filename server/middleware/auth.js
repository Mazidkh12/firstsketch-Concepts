const jwt = require('jsonwebtoken');

// Simple auth middleware for admin routes
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    // For demo purposes, accept simple admin token or JWT
    if (token === process.env.ADMIN_TOKEN || token === 'admin123') {
      req.user = { id: 'admin', role: 'admin' };
      return next();
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (jwtError) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Invalid token.'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication error'
    });
  }
};

// Generate JWT token for admin login
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { 
    expiresIn: '24h' 
  });
};

// Admin login endpoint
const adminLogin = (req, res) => {
  const { username, password } = req.body;
  
  // Simple admin credentials (in production, use proper user management)
  if (username === 'admin' && password === 'admin123') {
    const token = generateToken({ 
      id: 'admin', 
      role: 'admin',
      username: 'admin'
    });
    
    res.json({
      success: true,
      token,
      user: {
        id: 'admin',
        username: 'admin',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
};

module.exports = {
  authMiddleware,
  generateToken,
  adminLogin
};