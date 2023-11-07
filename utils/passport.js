const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient();

const { authUser } = require('../app/controller/api/v2/auth')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async(id, done)=> {
    done(null, await prisma.user.findUnique({ where: {id}}))
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordFieldField: 'password'
}, authUser))

module.exports = passport;