const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const authCookie = req.cookies && req.cookies.accessToken;
  // if(!token){
  //     res.status(401).send("Missing Token");
  // }
  if (!authCookie) {
    res.status(401).send("Missing AuthToken Cookie");
  } else {
    try {
      jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
        if (err) {
          return res.status(403).send("Invalid Token");
        } else {
          req._id = id;
          next();
        }
      });
    } catch (err) {
      res.status(403).send("Error Encountered" + err.toString());
    }
  }

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id)=>{
  //     if (err)
  //     {
  //         return res.status(403).send("Invalid Token");
  //     }
  //     else{
  //         req._id = id;
  //         next();
  //     }
  // })
};
