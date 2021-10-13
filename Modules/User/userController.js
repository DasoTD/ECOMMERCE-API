const User = require('../../models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { SALT } = process.env;
const jwt = require('jsonwebtoken');

const signup = async(req, res) => {
    try {
        const { username, email, password } = req.body
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json('Email exists already');
        }
        const encryptedPassword = await bcrypt.hash(
            password.toString(),
            Number(SALT)
          );
        user = await User.create({
            username,
            email,
            password: encryptedPassword
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const login = async(req,res) => {
    try {
        const { email, passwordReq} = req.body;
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json('User not found');
        }
        const match = await bcrypt.compareSync(passwordReq, user.password);
        if(!match){
            return res.status(400).json('incorrect details'); 
        }

        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3d"}
        )
        const { password, ...others } = user._doc;
        res.json({...others, accesstoken});
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {signup,login} ;