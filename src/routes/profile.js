const express = require("express");
const profileRouter = express.Router();

const userAuth = require("../middlewares/auth");
const {ValidateUserEditData} = require("../utils/validate");
//get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const users = req.user;
    res.send(users);
  } catch (err) {
    res.status(400).send("Somthing went wrong!!" + err.message);
  }
});
profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!ValidateUserEditData(req))
      throw new Error("This field can't update!!");

    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);
    await loggedInUser.save();
    res.send("user updated sucesscfully!!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
