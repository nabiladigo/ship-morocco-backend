const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) =>{
    try{
        const token =req.body.token || req.query.token || req.header["x-access-token"];

        if(!token) {
            res.status(403).json("A token is required for authentication");
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        if(!decoded){
            res.status(403).json("Token was not verified");
        }
         req.user = decoded;
         next();
    }catch(err){
        res.status(401).json("Invalid Token");
    }
}

module.exports = verifyToken;