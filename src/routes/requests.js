const express = require("express");
const requestRouter = express.Router();

const userAuth = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

//sender send the connection request to someone!!
requestRouter.post(
  "/requests/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      //check toUser id is present in user database or not
      const isValidUser = await User.findById(toUserId);
      if (!isValidUser) throw new Error("the user is not valid!!");

      //staus should be intrested or ignored
      const ALLOWED_STATUS = ["interested", "ignored"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type : " + status,
        });
      }

      //request should be sent only once by the user or from the user
      const existingConnectionRequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "connection request already exist!!",
        });
      }

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "connection request send sucessfully!",
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

// reciver recieve the profiles whom are intrested in this particular user and the user should accept and reject
requestRouter.post(
  "/requests/review/:status/:reqId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, reqId } = req.params;

      const ALLOWED_STATUS = ["accepted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(404).json({ message: "Invalid Status " + status });
      }

      const connectionRequest = await connectionRequestModel.findOne({
        _id: reqId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status("404").json("No such connection found!!");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

module.exports = requestRouter;
