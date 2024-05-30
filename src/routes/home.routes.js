const { Router } = require('express');
const verifytoken = require('../utils/auth.js');

const router = Router();

router.get('/profile', verifytoken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
