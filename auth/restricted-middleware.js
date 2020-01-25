const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorzation;

  //see if ther is a token
  //  check if it valid => rehash the header + payload + secret and see if it matches oiur verify signature
  // user id or username

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: 'not verified'
        })
      } else {
        req.decodedToken = decodedToken
        next();
      }
    });

  } else {
    res.status(400).json({
      message: 'no token provided'
    })
  }
};
