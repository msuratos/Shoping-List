require('dotenv').config();
const jwksClient = require('jwks-rsa');
let client = jwksClient({
  jwksUri: 'http://localhost:5000/.well-known/openid-configuration/jwks'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    let signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_KEY;

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, getKey, function(err, decoded) {
    if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.username;
    next();
  });
}

module.exports = verifyToken;