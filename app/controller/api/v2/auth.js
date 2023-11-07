const { PrismaClient } = require('@prisma/client');
const { encryptPassword, checkPassword } = require('../../../../utils/auth');
const { use } = require('passport');
const { JWTsign } = require('../../../../utils/jwt');


const prisma = new PrismaClient();

module.exports = {
    async login(req, res){
        const{email, password} = req.body;

        const user = await prisma.user.findFirst({
            where:{ email }
        })
        
        if(!user){
            return res.status(404).json({
                status: "Fail!",
                message:"Email tidak ditemukan!"
            })
        }

        const isPasswordCorrect =  await checkPassword(
            password, user.password
        )

        delete user.password
        const token = await JWTsign(user)

        if(!isPasswordCorrect){
            return res.status(401).json({
                status: "Fail!",
                message: "Password Salah!"
            })
        }

        return res.status(201).json({
            status: "Success!",
            message:"Berhasil Login",
            data:{user, token}
        })
    },

    async register(req, res){
        const { email, name, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email }
        })
        
        if(user){
            return res.status(404).json({
                status:"Fail!",
                message: "Email sudah terdaftar!"
            })
        }

        const createUser = await prisma.user.create({
            data:{
                email,
                name,
                password : await encryptPassword(password)
            }
        })

        return res.status(201).json({
            status: 'success',
            code: 200,
            message: 'Berhasil mendaftar',
            data: createUser
        })
    },

    async registerForm(req, res){
        const { email, name, password } = req.body;
        const user = await prisma.user.findFirst({
            where: { email }
        })
        
        if(user){
            req.flash("error","Email sudah terdaftar!")
            return res.redirect('/api/register')
        }

        const createUser = await prisma.user.create({
            data:{
                email,
                name,
                password : await encryptPassword(password)
            }
        })

        req.flash("success", "Berhasil Register")
        return res.redirect('/api/login')
    },

    authUser: async (email, password, done)=>{
        try {
            const user = await prisma.user.findUnique({
                where: {email}
            })
            if(!user || !await checkPassword(password, user.password)){
                return done(null,  false,  {message: 'Invalid email or password'})
            }

            return done(null, user)
        } catch (err) {
            return done(null, false, {message: err.message})
        }
    }
}