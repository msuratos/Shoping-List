require('dotenv').config();
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');
let client = jwksClient({
  jwksUri: 'https://identityserver.myorg.com:5001/.well-known/openid-configuration/jwks',
  requestAgent: new https.Agent({
    ca: fs.readFileSync('<file path>.crt')
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