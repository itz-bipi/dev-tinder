const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validate");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

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
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) res.status(400).send("user not found!!");
    res.send(users);
  } catch (err) {
    res.send("Somthing went wrong!!");
  }
});

//delete from the data base by findig from the ID
app.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted sucessfully!!");
  } catch (err) {
    res.status(400).send("somthing went wrong!!!");
  }
});

//update the user by finding through id
app.patch("/updateuser", async (req, res) => {
  const userId = req.body.userId;

  try {
    //what feild a user can update after creating an acount
    const ALLOWED_UPDATES = [
      "userId",
      "password",
      "age",
      "gender",
      "photourl",
      "about",
      "skills",
    ];
    const isAllowled = Object.keys(req.body).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    console.log(isAllowled);
    if (!isAllowled) {
      throw new Error("Update is not valid for this feilds!!!");
    }
    console.log(req.body.skills.length);
    if (req.body.skills.length > 10) {
      throw new Error("Skills should be less than 10!!");
    }

    await User.findByIdAndUpdate(userId, req.body, { runValidators: true });
    res.send("user updated sucessfully!!");
  } catch (err) {
    res.status(400).send("Update failed!!" + err.message);
  }
});

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
app.use("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Entered email is not valid!!");
    }

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credential");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      res.send("Login sucessfull!!");
    } else {
      throw new Error("Invalid credential!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

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
