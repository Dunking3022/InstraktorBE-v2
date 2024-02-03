const User = require("../Models/User");
const passmatch = require("../Utils/pass-match");
const jwt = require('jsonwebtoken');

exports.fetchUserData = async (req,res) => {
    let data = req.body;
    try{
        const userAcc = await User.findById({"_id": req._id});
        if(!userAcc){
            res.status(404).send("User not found");
            return;
        }
        
            const {password, ...userJSON} = userAcc.toJSON();
            if(userJSON.verified == "UNVERIFIED"){
                res.status(401).send("Not Verified. Please verify your email!");
            }
            else{
                const accessToken = jwt.sign(userJSON._id.toString(), process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({accessToken: accessToken, ...userJSON});
            }
    }
    catch(err){
            res.send(err.toString());
    }
}

exports.updateUserData = async (req, res) => {
    const userId = req._id;
    const newData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

        if (!updatedUser) {
            res.status(404).send("User not found");
            return;
        }

        const { password, ...userJSON } = updatedUser.toJSON();

        if (userJSON.verified == "UNVERIFIED") {
            res.status(401).send("Not Verified. Please verify your email!");
        } else {
            const accessToken = jwt.sign({ userId: userJSON._id.toString() }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ accessToken: accessToken, ...userJSON });
        }
    } catch (err) {
        res.status(500).send(err.toString());
    }
}