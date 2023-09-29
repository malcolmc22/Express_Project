const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true})
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy:true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });

})

// router.get('/users', async (req,res) => {
//     const users = await User.findAll()

//     res.json(users)
// })

module.exports = router;

// fetch('/api/users/', {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//         "XSRF-TOKEN": "VjiE4RvO--H_iltZZVjWzaP_A96_6hipEnkk"
//     },
//     body: JSON.stringify({
//         firstName: 'Alex',
//         lastName: 'Caleb',
//         email: 'wehatepython@javascript.com',
//         username: 'welovejava',
//         password:'unoaraw'
//     })
// }).then(res => res.json()).then(data => console.log(data))


// fetch('/api/users/users', {
//     method: 'GET',
// })
// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'XSRF-TOKEN': "0lhbMe2R-ogOLvbEu9xJB8pSCCbfnF1RhOec"
//     },
//     body: JSON.stringify({
//         email: 'spood1er@spider.man',
//         username: 'Spi100der',
//         password: 'password'
//     })
// }).then(res => res.json()).then((data))
