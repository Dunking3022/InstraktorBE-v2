const User = require("../Models/User");

exports.verifyUser = async (req,res)=>{
    uid = req.params.uid;
    try{
        const currentStatus = await User.findById(uid);
        if(!currentStatus){
            res.status(404).send("User Not Found");
        }
        else if(currentStatus.verified == "VERIFIED"){
            res.status(409).send("Already Verified");
        }
        else{
            await User.findByIdAndUpdate(uid,{"verified": "VERIFIED"});
            res.status(200).send("User Verified");
        }
    }
    catch(err){
        res.status(403).send("Invalid Format");
    }

    
}