const userAuthentication = (req,res,next)=>{
    const reqdata = "xyz";
    const isValid = reqdata === "xyz";
    if(!isValid){
        res.status(401).send("the user is not Admin!!");
    }
    else{
        next();
    }
}

module.exports = userAuthentication;