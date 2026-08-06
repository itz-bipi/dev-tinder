const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest"); 
const userSafeDATA = "firstName lastName photourl age skills gender";

//this API list down all the pending intrested user to the loggedIn user to review
userRouter.get("/user/request/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequestModel.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId",userSafeDATA);

        res.json({
            message : "the data fetched sucessfully!!",
            data : connectionRequest
        })


    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

//this API givs the whom are connected to the user !!
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequestModel.find({
            $or:[
                {toUserId : loggedInUser._id,status : "accepted"},
                {fromUserId : loggedInUser._id,status : "accepted"}
            ]
        }).populate("fromUserId",userSafeDATA).populate("toUserId",userSafeDATA);
        console.log(connectionRequest);
        const data = connectionRequest.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.send({data });
    }
    catch(err){
        res.status(400).send("Error" + err.message);
    }
})


module.exports = userRouter