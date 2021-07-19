const {sequelize} = require('./index');
const { Model, Sequelize, DataTypes, UUIDV4 }= require("sequelize");


class Books extends Model {};

Books.init({
    bookName :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    genre :{
        type:DataTypes.STRING,
        allowNull:false
    },
    authorName :{
        type:DataTypes.STRING,
        allowNull:false
    },
    publishedDate :{
        type:DataTypes.DATE,
        allowNull:false
    },
    pageCount :{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description :{
        type:DataTypes.TEXT,
        allowNull:false
    },
    public:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
},{sequelize,createdAt:true,updatedAt:true})


Books.sync();

module.exports = Books;
