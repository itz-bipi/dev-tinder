const express = require("express");

const app = express();

// app.get("/user",(req,res)=>{
//     res.send("get the user dashboard");
// })

app.post("/user",(req,res)=>{
    res.send("save the user data sucessfully");
})

app.patch("/user",(req,res)=>{
    res.send("patch the user dashboard");
})

app.delete("/user",(req,res)=>{
    res.send("user dashboard deleted sucessfully!");
})
// app.use("/",(req,res)=>{
//     res.send("Namaste ji!!");
// })

//playing with the route things
app.get("/user",
    (req,res,next)=>{
    console.log("fisrt route handler invoked!!");
    next();
},
(req,res)=>{
   console.log("second handler function invoked")
   res.send("2nd responce!!");
})


app.listen(3000,()=>{
    console.log("the server is running on port 3000");
});