const jwt = require('jsonwebtoken');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({ path: envFile });


const authMiddleware = (req, res, next) => {
  // Le token peut être passé dans le header "Authorization"
  // sous la forme "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    // On stocke les infos du token dans req.user
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
