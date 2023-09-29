const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
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
