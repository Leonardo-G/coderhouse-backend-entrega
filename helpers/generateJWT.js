const jwt = require("jsonwebtoken");

const generateJWT = ( payload ) => {
    return new Promise((resolve, reject) => {
        
        jwt.sign( payload, process.env.SECRET_JWT, { expiresIn: 12000}, ( err, jwtoken ) => {
            if(err){
                reject(err);
            }else{
                resolve(jwtoken);
            }
        })
    })
}

module.exports = generateJWT;