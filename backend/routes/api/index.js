const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');

const { restoreUser } = require('../../utils/auth'); //make this the first before any other middleware or router handlers are connected
const { setTokenCookie } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

// Testing restoreUser
router.get('/restore-user', (req, res) => {
    return res.json(req.user)
});

// Testing requireAuth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user)
});

// Testing setTokenCookie

router.get('/set-token-cookie', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({user: user})
})

router.post('/test', (req, res) => {
    res.json({requestBody: req.body });
})
module.exports = router;
