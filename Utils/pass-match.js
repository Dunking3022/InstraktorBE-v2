const bcrypt = require('bcrypt');

exports.compare = async function(password,hash){
    
    return bcrypt.compare(password,hash);
}