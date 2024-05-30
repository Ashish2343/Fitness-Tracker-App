const JWT = require('jsonwebtoken');

const generatetoken = (user)=>{
    return JWT.sign({
        username:user.username,
        id:user._id,
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
};

const verifytoken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = generatetoken,verifytoken;