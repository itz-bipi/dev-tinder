const express = require("express");

const app = express();

app.use("/d",(req,res)=>{
    res.send("hello this is server dashboard!!")
})

app.use("/test",(req,res)=>{
    res.send("hello this is test dashboard!")
})

app.use("/demo",(req,res)=>{
    res.send("this is demo dashboard!!");
})

app.listen(3000,()=>{
    console.log("the server is running on port 3000");
});