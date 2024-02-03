const User = require("../Models/User");

exports.registerUser = async (req,res) => {
    let data = req.body;
    console.log(">>Creating New User");
    console.log(data);
    try{
        const userAcc = await User.create(data);
        res.status(200).json({message: "User Successfully Registered"});
    }
    catch(err){
        if(err.code == 11000){
            res.status(409).json({message: "Duplicate Key Error",keyValue : err.keyValue});
        }   
        else{
            res.satus(403).send(err.toString());
        }
    }
}