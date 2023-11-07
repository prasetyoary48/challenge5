const express = require('express')
const router = express.Router();
const controller = require('../app/controller')

//import passport
const passport = require('../utils/passport')

router.post('/api/v2/auth/login', controller.auth.login)
router.post('/api/v2/auth/register', controller.auth.register)

//view
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
    


module.exports = router;