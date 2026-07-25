const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://bipinpala30_db_user:3MKRNs9THCUl18p3@namastenode.joyioxw.mongodb.net/devTinder");
}

module.exports = connectDB;


