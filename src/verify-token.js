require('dotenv').config();
const https = require('https');
const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');
let client = jwksClient({
  jwksUri: 'https://localhost:5001/.well-known/openid-configuration/jwks',
  requestAgent: new https.Agent({
    rejectUnauthorized: false //TODO: remove this once a valid cert is used instead of self-signed
                              // this is only used because of using self-signed cert for Identity
                              // Server local development
  })
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    if (err) {
      console.error(err);
      throw err;
    }
    let signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth.split(' ')[1];

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, getKey, function(err, decoded) {
    if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    req.userId = decoded.preferred_username;
    next();
  });
}

module.exports = verifyToken;