const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.use(express.json())

app.post("/signup",async(req,res)=>{
        console.log(req.body);
        const user = new User(req.body);
        try{
            await user.save();
            res.send("user sign up sucessfully!!");
        }catch(err){
            res.status(400).send("sign up failed!!");
        }
        
})


connectDB()
    .then(()=>{
        console.log("Database connection established Sucessfully!!");
        app.listen(3000,()=>{
            console.log("app is running in port 3000")
        })
    }).catch((err)=>{
        console.log("Database cnnection failed!" + err);
    })