const express = require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");




//sign up in the application
authRouter.post("/signup", async (req, res) => {
  try {
    //validate the data first
    validateSignupData(req);
    //encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    
    //save the into db
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();

    res.send("user sign up sucessfully!!");
  } catch (err) {
    res.status(400).send("sign up failed!!" + err.message);
  }
});

//login to the apllication
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Entered email is not valid!!");
    }

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found!!");

    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {

      //create JWT token
      const token = await user.getJWT();
      //attach inside the cookie to send the user
      res.cookie("token",token,{expires : new Date(Date.now() + 8 * 3600000)});

      res.send("Login sucessfull!!");
    } else {
      throw new Error("Invalid credential!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout",async (req,res)=>{
    try{
        res.cookie("token",null,{
            expires : new Date(Date.now())
        });
        res.send("Log out Sucessfully!!");
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
})

module.exports = authRouter;