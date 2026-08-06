const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        required : true,
        enum :{
            values : ["accepted","rejected","interested","ignored"],
            message : `{value} is incorrect status type!.`
        }
    }
},{
    timestamps : true
})

connectionRequestSchema.pre("save",function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send the rquest to yourself!!");
    }
   
})

connectionRequestSchema.indexes({fromUserId : 1,toUserId:1});

const connectionRequestModel = new mongoose.model("connectionRequestModel",connectionRequestSchema);

module.exports = {connectionRequestModel};