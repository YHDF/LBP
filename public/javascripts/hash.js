const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(req, res, next){
    var hasher = await encrypt()
    return hasher;
}

function encrypt(){
    return new Promise(async function(resolve, reject){
        bcrypt.hash(password, saltRounds, async function (err, hash){
            resolve(hash);
        });      
    })
}


module.exports.hash = hash