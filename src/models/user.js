const mongoose = require("mongoose");

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
        trim : true
    },
    password : {
        type : String,
        required : true,
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
        default :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1pLlmnu9qHOG3fyLc3uTB7VpCbi5a6F0CxzgaEPBzQ&s=10"
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