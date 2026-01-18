const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Decodes the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // IMPORTANT: Attach the user ID to the request object
      req.user = decoded; 
      
      next();
    } catch (error) {
      console.error("Token Error:", error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };