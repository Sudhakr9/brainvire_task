const {DataTypes,Sequelize, Model} = require('sequelize');
const {sequelize} = require('./index');


class User extends Model {}
User.init(
    {
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.STRING,
            defaultValue:'Readers',
            enum:["SuperAdmin","Authors","Readers"]
        },
        accessToken: {
            type: DataTypes.STRING
        }
    },{
        sequelize,
        timestamps:true,
        createdAt:false,
        updatedAt:false
    }
);


module.exports = User;

