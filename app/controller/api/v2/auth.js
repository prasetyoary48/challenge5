require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
const { encryptPassword, checkPassword } = require('../../../../utils/auth');
const { use } = require('passport');
const { JWTsign } = require('../../../../utils/jwt');
const jwt2 = require('jsonwebtoken')


const prisma = new PrismaClient();

module.exports = {
    async login(req, res){
        req.io.emit('notification','Berhasil Daftar')
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
        console.log(token)

        return res.status(201).json({
            status: "Success!",
            message:"Berhasil Login",
            data:{user, token}
        })
    },

    async whoami(req, res){
        return res.status(200).json({
            status:"success!",
            message:"OK",
            data:{
                user: req.user
            }
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
            return res.redirect('/register')
        }

        const createUser = await prisma.user.create({
            data:{
                email,
                name,
                password : await encryptPassword(password)
            }
        })

        req.flash("success", "Berhasil Register")
        return res.redirect('/login')
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
    },

    oauth: async (req, res) =>{
        const token = await JWTsign({
            ...req.user,
            password: null
        })
        return res.json({
            status: "Success!",
            message: "Berhasil Login!",
            data: { token }
        })
    },
    async update(req, res){
        const decodedToken = jwt2.verify(req.body.token, process.env.JWT_SECRET_KEY); 
      
        const userEmail = decodedToken.email;
      
        console.log("Email yang sesuai dengan token:", userEmail);
    
        const updatedData = await prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                password:await encryptPassword(req.body.password)
            }
        });
        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: updatedData
        })
    }
}