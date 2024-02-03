const bcrypt = require('bcrypt');

exports.getHashedPassword = async function(password){
    
    var salt = bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}