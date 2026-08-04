const express = require("express")
const profileRouter = express.Router();

const userAuth = require("../middlewares/auth")
//get profile
profileRouter.get("/profile",userAuth,async (req,res) =>{
  
  try{
    
   const users = req.user;
   res.send(users);
  }catch(err){
    res.status(400).send("Somthing went wrong!!" + err.message)
  }
})

module.exports = profileRouter;

