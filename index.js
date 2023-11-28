require('dotenv').config()
const Sentry = require("@sentry/node")
const { ProfilingIntegration } = require("@sentry/profiling-node");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { JWTsign } = require('./utils/jwt');

const express = require('express')
const ejs = require('ejs')
const { sendMail, sendMailHTML } = require('./libs/mailer')
const app = express()
const port = 3000
const path = require('path')
const BASE_URL = process.env.BASE_URL

const http = require('http').Server(app)
const io = require('socket.io')(http)

const connectedUsers = new Set();

io.on('connection', (socket) => {
    connectedUsers.add(socket.id);
    socket.on('register', () => {
      io.to(socket.id).emit('notification', { type: 'welcome', message: 'Selamat datang' });
    });
  
    socket.on('passwordChanged', () => {
      io.emit('notification', { type: 'passwordChanged', message: 'Password berhasil diubah!' });
    });
});

const flash = require('express-flash')
const session = require('express-session')

const routers = require('./router')
const swaggerJSON = require('./openapi.json')
const swaggerUI = require('swagger-ui-express')

const passport = require('./utils/passport')

const morgan = require('morgan')



app.use(morgan('combined'))


app.use(express.json());
app.use(express.urlencoded({ extend:false }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, './app/view'))
app.use((req, res, next)=>{
    req.io= io
    return next()
})


Sentry.init({
    dsn: 'https://3ada9b9fe7cbe6ae8f62eddd08b80f0d@o4506258322882560.ingest.sentry.io/4506258588172289',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
  
app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());



app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSON))
app.use('/',routers)

app.post('/resetpassword', async (req, res) => {
    const user = await prisma.user.findFirst({
        where:{
            email: req.body.email
        } 
    })
    if(!user){
        return res.status(404).json({
            status: "Fail!",
            message:"Email tidak ditemukan!"
        })
    }
    if(user){
        const { email, password, name } = req.body;
        // console.log(req.body)
        // sendMail(email, `Halo ${name}`, 
        //   `Terima kasih sudah mendaftar di aplikasi kami! Silahkan klik
        //    link berikut untuk proses verifikasi email anda`
        // )
        const token = await JWTsign(user)
        const url = req.protocol+"://"+req.headers.host
        console.log(url)
        ejs.renderFile(__dirname + "/app/view/templates/mail.ejs", 
          { 
            name: name,
            reset:`${url}/changepassword?token=${token}`
          }, 
          function (err, data) {
          if (err) {
            console.log(err);
          } else {
            sendMailHTML(email, `Halo ${user.name}`, data)
          }
        })
        res.status(200).json({
          status: 'ok',
          message: `Berhasil Register! silahkan cek email 
          untuk verifikasi`
        })
    }
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());
  

app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))


module.exports = app
