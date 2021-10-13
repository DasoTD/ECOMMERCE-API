const jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next)=> {
    const authHeader = req.headers.Authorization;
    if(authHeader){
        const Authorization = authHeader.split(" ")[1];
        jwt.verify(Authorization, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }else {
        return res.status(401).json("You are not authenticated")
    }
};

const verifyTokenAndAuthentication = async(req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else{
            res.status(403).json("You are not authorised")
        }
    })
};

const verifyTokenAndAdmin = async(req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
            next()
        } else{
            res.status(403).json("You are not authorised")
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthentication, verifyTokenAndAdmin } ;