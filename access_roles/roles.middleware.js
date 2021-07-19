// route middleware to verify a token
var express    = require('express');
var jwt        = require('jsonwebtoken');
var apiRoutes  = express.Router();
const config = require('../config/db.config')
apiRoutes.use(function(req, res, next) {

    var token = req.headers['authorization'] || req.headers['x-access-token'];
    console.log("******************************",req.headers.authorization);
    // decode token
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7,token.length).trimLeft();
     
      jwt.verify(token,config.jwtstring, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.user = decoded; 
          next();
        }
      });
      
  
    } else {

      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });

  module.exports =apiRoutes;