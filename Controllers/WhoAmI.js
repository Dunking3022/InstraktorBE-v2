exports.whoami = (req,res)=>{
    if(req._id) res.send(req._id)
    else res.send("No User Data Found");
}