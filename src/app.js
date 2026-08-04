const express = require("express");
const validator = require("validator");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());//reading all the JSON request
app.use(cookieParser());//reading the cookie token


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);





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
