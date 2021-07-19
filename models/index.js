const dbConfig = require('../config/db.config');

const {Sequelize} = require('sequelize') ;

var sequelize = new Sequelize(dbConfig.DB,"postgres","root", {
    host:"localhost",
    dialect: 'postgres'
    //5432
})

//db test
async function dbTest(){
    try{
        await sequelize.authenticate(()=>{
            console.log("connected successfully");
        })
    }catch(err){
        console.log(`Got Errors while connecting to the Db ${err}`);
    }
}

dbTest();
sequelize.sync();
module.exports ={sequelize};