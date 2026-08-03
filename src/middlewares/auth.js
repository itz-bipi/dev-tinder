const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { model } = require("mongoose");

const userAuth = async (req,res,next) =>{
    try{
        //recive the cookie
        const {token} = req.cookies;
        if(!token) throw new Error("Token not Found!");

        //find the decodeData
        const decodeData = await jwt.verify(token,"Hacker@Lucy09");
        const {_id} = decodeData;

        //find the user
        const users = await User.findById(_id);
        if(!users) throw new Error("User is not found!!");
        
        req.user = users;
        next();

    }
    catch(err){
        res.status(400).send("Somthing went wrong!!!");
    }
}

module.exports = userAuth;