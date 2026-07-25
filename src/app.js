const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.use(express.json())

//find user from the database
// app.get("/user",async (req,res)=>{
//     try{
//        const user =  await User.find({email : req.body.email});
//         res.send(user);
//     }catch(err){
//         res.status(400).send("somthing went wrong!!!");
//     }
    
// })

//bulding feed page of the website
app.get("/feed",async (req,res)=>{
    try{
        const users = awaitUser.find({});
        if(users.length === 0) res.status(400).send("user not found!!");
        res.send(users);
    }catch(err){
        res.send("Somthing went wrong!!");
    }
})

//delete from the data base by findig from the ID
app.delete("/deleteuser",async (req,res)=>{
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send("user deleted sucessfully!!");
    }
    catch(err){
        res.status(400).send("somthing went wrong!!!");
    }
})


//update the user by finding through id
app.patch("/updateuser",async(req,res)=>{
    const userId = req.body.userId;
    try{
        await User.findByIdAndUpdate(userId,req.body);
        res.send("user updated sucessfully!!")
    }
    catch(err){
        res.status(400).send("Somthing went wrong!!");
    }
})
//sign up in the application
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

//connect to the database and start the application
connectDB()
    .then(()=>{
        console.log("Database connection established Sucessfully!!");
        app.listen(3000,()=>{
            console.log("app is running in port 3000")
        })
    }).catch((err)=>{
        console.log("Database cnnection failed!" + err);
    })