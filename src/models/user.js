const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("email is not valid!!");
          
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)) throw new Error("Password is not strong enough!!!!");
          
        }
    },
    age : {
        type : Number,
        min : 18,
        max : 80
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("The gender is not valid!!");
                
            }
        }
    },
    photourl :{
        type : String,
        default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1pLlmnu9qHOG3fyLc3uTB7VpCbi5a6F0CxzgaEPBzQ&s=10",
        validate(value){
            if(!validator.isURL(value)) throw new Error("Not a valid photo url!!");
          
        }
    },
    about:{
        type : String,
        default:"hye,I am tech enthusiastic!!!"
    },
    skills : {
        type : [String]
    },

},{
    timestamps : true
});

module.exports = mongoose.model("User",userSchema);