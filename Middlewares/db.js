const mongoose = require('mongoose');
require('dotenv').config();
const dbURI = process.env.dbURI

exports.connectToDB = ()=>{

    return new Promise((resolve,reject)=>{
    console.log(">>Attempting Database Connection");
    mongoose.connect(dbURI)
    .then(()=>{
        console.log(">>Database Connection Succesful");
        resolve();

    })
    .catch((err)=>{
        console.log(">>Database Connection Failed");
        console.log(err);
        reject(err);
    })
    })

}