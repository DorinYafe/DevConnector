const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route   Postet api/auth
// @desc    Register user
// @access  Public

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more charachters')
        .isLength({
            min: 6
        })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ megg: 'User alread exists' }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        
        // See if the user exists 

        // Get users gravatar

        // Encrypt the password

        // Return the jsonwebtoken

        res.send('User route');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


    res.send('User route');
});

module.exports = router;    