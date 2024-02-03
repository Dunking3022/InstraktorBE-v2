const User = require("../Models/User");
const passmatch = require("../Utils/pass-match");
const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res) => {
    let data = req.body;
    try{
        console.log(data);
        const userAcc = await User.findOne({"username": data.username});
        if(!userAcc){
            res.status(404).send("User not found");
            return;
        }
        const match = await passmatch.compare(data.password,userAcc.password);
        if(match){
            const {password, ...userJSON} = userAcc.toJSON();
            if(userJSON.verified == "UNVERIFIED"){
                res.status(401).send("Not Verified. Please verify your email!");
            }
            else{
                const accessToken = jwt.sign(userJSON._id.toString(), process.env.ACCESS_TOKEN_SECRET);
                res.status(200).cookie("accessToken",accessToken,{httpOnly: true, secure: true, maxAge: 1000000}).json({accessToken: accessToken, ...userJSON});
            }
        }
        else{
            res.status(401).send("Invalid Credentials");
        }
    }
    catch(err){
            res.send(err.toString());
    }
}   