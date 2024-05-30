const User =  require('../models/user.model.js');
const  generatetoken = require('../utils/auth.js');


const registerUser = async (req,res) => {
    const {username, password, name} = req.body;

    if(username === ""){
        return res.status(400).json({message: "Username is required"});
    }if(password === ""){
        return res.status(400).json({message: "Password is required"});
    }if(name === ""){
        return res.status(400).json({message: "Name is required"});
    }

    const ExistedUser = await User.findOne({username});

    if(ExistedUser){
        return res.status(400).json({message: "User already exists"});
    }

    const user = await User.create({
        username : username.toLowerCase(),
        password,
        name
    })

    const token = generatetoken(user);
    res.cookie('token',token, {httpOnly: true});

    return res.status(200).json({message: 'User is Successfully Registered'});
};

const loginuser = async (req, res) => {
    const {username, password} = req.body;

    if(username === ""){
        return res.status(400).json({message: "Username is required"});
    }if(password === ""){
        return res.status(400).json({message: "Password is required"});
    }

    const user = await User.findOne({username : username.toLowerCase()});
    if(!user){
        return res.status(400).json({message: "User does not exist"});
    }

    const isPasswordCorrect =  await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Password is incorrect"});
    }

    const token = generatetoken(user);
    res.cookie('token', token);


    return res.status(400).json({message : "User succesfully logged in"});

};


module.exports = {
    registerUser,loginuser
}