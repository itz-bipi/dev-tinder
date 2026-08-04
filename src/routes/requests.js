const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middlewares/auth")

requestRouter.post("/connectionRequest",userAuth,(req,res) =>{
  try{
    const users = req.user;
    console.log(users);
    res.send(users.firstName + " send the request");
  }
  catch(err){
    res.status(400).send("Error : " + err.message);
  }
})

module.exports = requestRouter;