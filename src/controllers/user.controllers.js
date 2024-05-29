const User =  require('../models/user.model.js');

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

    return res.status(200).json({message: 'User is Successfully Registered'});
};

module.exports = {
    registerUser
}