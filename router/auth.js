const express = require('express')
const router = express.Router();
const controller = require('../app/controller')
const { auth } = require('../utils/jwt')


//import passport
const passport = require('../utils/passport')
const passportOAUTH = require('../utils/oauth')

router.post('/api/v2/auth/login', controller.auth.login)
router.post('/api/v2/auth/register', controller.auth.register)
router.get('/api/v2/auth/whoami', auth, controller.auth.whoami)

//view
router.get('/resetpassword', (req, res)=>{
    res.render('reset.ejs')
})
router.get('/changepassword', (req, res)=>{
    console.log('ini token',req.query.token)
    const token = req.query.token;
    res.render('resetnewpassword.ejs',{token})
})
router.post('/changepassword', controller.auth.update)

router.get('/register', (req, res)=>{
    res.render('register.ejs')
})
router.post('/register', controller.auth.registerForm)


router.get('/login', (req, res)=>{
    res.render('login.ejs')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}))

router.get('/auth/google',
    passportOAUTH.authenticate('google',{
        scope: ['profile', 'email']
    })
)
router.get('/auth/google/callback',
    passportOAUTH.authenticate('google',{
        failureRedirect: '/login',
        session: false
    }), controller.auth.oauth
)
    
module.exports = router;