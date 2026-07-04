const express = require("express");

const app = express();

const checkAuth = require("./middlewares/auth")

//checking the authentication for admin user
app.use("/user",checkAuth)

app.get("/user/getData",(req,res)=>{
    res.send("the data is fetched sucessfully!!");
})

app.delete("/user/deleteUser",(req,res)=>{
    res.send("the user is deleted sucessfully!");
})

app.listen(3000,()=>{
    console.log("the server is running on port 3000");
});