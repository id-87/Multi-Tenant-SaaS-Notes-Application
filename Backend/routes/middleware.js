const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];

 if (token == null) {
  return res.status(401).json({ message: 'Authorization token is required' });
 };

    jwt.verify(token, "ver", (err, user) => {
    if (err) {
         return res.status(403).json({ message: 'Invalid or expired token' });
     };

    req.user = user;
    next();
     });
};

module.exports = authenticateToken;