const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");

const app = express();
app.use(express.json());//reading all the JSON request
app.use(cookieParser());//reading the cookie token


//sign up in the application
app.post("/signup", async (req, res) => {
  try {
    //validate the data first
    validateSignupData(req);
    //encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    //save the into db
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    console.log("hello");
    await user.save();
    res.send("user sign up sucessfully!!");
  } catch (err) {
    res.status(400).send("sign up failed!!" + err.message);
  }
});

//login to the apllication
app.post("/login", async (req, res) => {
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


//get profile
app.get("/profile",userAuth,async (req,res) =>{
  
  try{
    
   const users = req.user;
   res.send(users);
  }catch(err){
    res.status(400).send("Somthing went wrong!!" + err.message)
  }
})

app.post("/connectionRequest",userAuth,(req,res) =>{
  try{
    const users = req.user;
    console.log(users);
    res.send(users.firstName + " send the request");
  }
  catch(err){
    res.status(400).send("Error : " + err.message);
  }
})

//connect to the database and start the application
connectDB()
  .then(() => {
    console.log("Database connection established Sucessfully!!");
    app.listen(3000, () => {
      console.log("app is running in port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cnnection failed!" + err);
  });
