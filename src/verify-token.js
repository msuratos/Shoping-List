require('dotenv').config();

const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_KEY;

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, jwt_secret, function(err, decoded) {
    if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.username;
    next();
  });
}

module.exports = verifyToken;