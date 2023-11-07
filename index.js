// const os = require('os')
// const luasSegitiga = require('./segitiga')

// import os from 'os';
// import luasSegitiga from './segitiga';

// console.log("Free Memory", os.freemem())
// console.log(luasSegitiga(2,2));


// const { Client } = require('pg');
// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'blog',
//     user: 'postgres',
//     password: 'postgrepassword',
// })

// async function connectDB(){
    
//     await client.connect()
    
//     const res = await client.query(`
//         SELECT * FROM users`,
//     )
    
//     console.log(res.rows[1].name)
//     await client.end()
// }

// connectDB();



// app.get('/', (req, res)=>{
//     res.send("Hello World")
// })

// app.get('/products', (req, res)=>{
//     res.json([
//         "Apple",
//         "Redmi",
//         "One Plus One"
//     ])
// })

// app.get('/orders', (req,res)=>{
//     res.json([
//         {
//             id:1,
//             paid:false,
//             user_id:1
//         },
//         {
//             id:2,
//             paid:false,
//             user_id:1
//         },
//     ])
// })

// app.listen(3000, () => {
//     console.log("Server Nyala")
// })


//=================================================
const express = require('express')
const app = express()
const port = 3000
const path = require('path')



const flash = require('express-flash')
const session = require('express-session')

const routers =require('./router')
const swaggerJSON = require('./openapi.json')
const swaggerUI = require('swagger-ui-express')

const passport = require('./utils/passport')


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

app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSON))
app.use('/api',routers)

// let server; 
// beforeAll((done) => {
//     jest.setTimeout(5000);
//     server = app.listen(3001, () => {
//       done(); 
//     });
// });

// afterAll((done) => {
//     jest.setTimeout(5000);
//     server.close(done);
// });
  

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

// if(!module.parent){
//   app.listen(process.env.PORT, () =>
//     console.log(`Example app listening on port ${process.env.PORT}!`),
//   );
// }

// app.get('/', (req, res) => res.status(200).send('asd'))



module.exports = app
// app.get('',(req, res) => res.status(404).send('Gak Ketemu'))