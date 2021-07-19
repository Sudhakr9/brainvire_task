
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config')

async function hashPassword(password){
    return await bcrypt.hash(password,10);
}

const validPassword =async (plainPassword,hashedPassword)=>{
    return await bcrypt.compare(plainPassword,hashedPassword);
}

exports.CreateUser =async(req,res)=>{
    try{
        const {email,userName,password,role} = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = {email,userName,password:hashedPassword,role:role || "Readers"}
        const findUser= await User.findOne({where:{userName:userName,email:email}});
        if(findUser){
            res.status(400).send("user alredy existed")
        }else{
            User.create(newUser)
            .then((user)=>{
                res.status(200).send(user);
            })
            .catch(err=>{
                res.status(500).send(err)
            })
        }
    }
    catch(error){
        throw err;
    }
} ;

exports.signIn = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        console.log(req.body);
        if(!req.body) return next(new Error("pls Provide valid email Or password"))
        const user =await User.findOne({where:{email:email}})
        if(!user){
            return next(new Error("email Does not existed"));
        }
        else{
            const validPwd = await validPassword(password,user.password);
            if(!validPwd) return next(new Error("Password Doesnot match"));
            const accessToken = jwt.sign({userId:user.id},config.jwtstring,{expiresIn:"1d"});
            res.status(200).send({
                data:{email:user.email,role:user.role},
                token:accessToken
            })
        }
    }
    catch(error){
        res.status(500).send(error);
    }
}