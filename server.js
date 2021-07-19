const express = require('express');
const app = express();
const router = require('./routes/routes')
const jwt = require('jsonwebtoken');
const User = require('./models/users.model')
app.use(express.json());
//url parsed
app.use(express.urlencoded({extended:false}));
//router
//dbpath
const db = require('./models');
db.sequelize.sync();
app.use(router);
 //test api
 router.get('/', (req, res)=> {
    res.json({ message: 'Books: welcome to Books api !' });   
});
//global error
app.use(function(req, res, next) {
    next(Error);
});
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,token,x-access-token');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//port
const Port = process.env.PORT || 3001;
//server run
app.listen(Port,()=>{
    console.log(`Server Starting at ${Port}`);
})