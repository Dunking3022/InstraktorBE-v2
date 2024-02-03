const mongoose = require('mongoose');
const passhash = require('../Utils/pass-hash');
const emailhandler = require('../Controllers/emailhandler');


const User = mongoose.Schema({
      studentid: {
        type: Number,
        unique: true,
        required: true,
      },
      name: {
        type: String, 
        trim : true,
      },
      username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
      },
      img: {
        type:String,
        required:false
      },
      group:{
        type: Number,
        required: 'Group is required',
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
      password: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      verified: {
        type: String,
        enum: ['VERIFIED','UNVERIFIED'],
        default: 'UNVERIFIED'
      }
})

User.pre('save', async function(next) {
  this.password = await passhash.getHashedPassword(this.password);
  this.img = `https://api.dicebear.com/7.x/notionists/svg?seed=${this.studentid}&beardProbability=0`;
  try{
    const bool = await emailhandler.transferMail(this._id, this.email);
  
          if (bool) {
            console.log(`Verification Mail sent to E-mail ${this.email}`);
          } else {
            console.log("Error Encountered Sending Email");
          }

  }
  catch(err){
    console.log("Error Encountered!");
    console.log(err);
  }
  next();
})

module.exports = mongoose.model("User",User);