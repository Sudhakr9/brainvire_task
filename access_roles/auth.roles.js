const User = require('../models/users.model')

exports.permit =(...permittedRoles) =>{
    // return a middleware
    console.log("***************",permittedRoles);
    return (request, response, next) => {
      const { user } = request
        console.log("****,role",user);
      if (user && permittedRoles.includes(user.role)) {
        next(); 
      } else {
        response.status(403).json({message: "Forbidden"}); 
      }
    }
}