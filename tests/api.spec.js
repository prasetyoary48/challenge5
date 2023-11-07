const request = require('supertest')
const app = require('../index')

//USER
describe("GET /api/api/v2/users", ()=> {
    test("Return status: 200 and Users Data", async ()=> {
        const res = await request(app).get('/api/api/v2/users')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Array))
    })
})
describe("GETBYID /api/api/v2/users", ()=> {
    let itemId = 1
    test("Return status: 200 and Users Data", async ()=> {
        const res = await request(app).get(`/api/api/v2/users/${itemId}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
    })
})

//TUTUP USER


//BankAccount
describe("GET /api/api/v2/bank_accounts", ()=> {
    test("Return status: 200 and bank_accounts Data", async ()=> {
        const res = await request(app).get('/api/v2/bank_accounts')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Array))
    })
})
describe("GETBYID /api/api/v2/users", ()=> {
    let itemId = 1
    test("Return status: 200 and Users Data", async ()=> {
        const res = await request(app).get(`/api/v2/bank_accounts/${itemId}`)
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
    })
})
//TutupBankAccount

//Transactions
describe("GET /api/api/v2/transactions", ()=> {
    test("Return status: 200 and transactions Data", async ()=> {
        const res = await request(app).get('/api/v2/transactions')
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Array))
    })
})
describe("GETBYID /api/api/v2/users", ()=> {
    let itemId = 1
    test("Return status: 200 and Users Data", async ()=> {
        const res = await request(app).get(`/api/v2/transactions/${itemId}`)
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Object))
    })
})
//TutupTransactions

//Auth
//Register
describe("GET /api/api/v2/auth", ()=> {
    let dId
    test("GET /api/api/v2/auth - Return status: 200 and Auth Data", async () => {
        const res = await request(app).post('/api/api/v2/auth/register').send({
            name: 'budi',
            email: 'kayanyasudah@mail.com',
            password: '1234'
        })
        console.log(res.body.data.id)
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.any(Object));
        dId = +res.body.data.id
        return dId
    }) 
    test('DELETE /api/data/:id - Should delete the created entity', async () => {
        const response = await request(app).delete(`/api/api/v2/users/${dId}`)
        expect(response.status).toBe(200)
    });
})
//TutupRegister

//Login
describe("GET /api/api/v2/auth", ()=> {
    test("GET /api/api/v2/auth - Return status: 200 and Auth Data", async () => {
        const res = await request(app).post('/api/api/v2/auth/login').send({
            email: 'lol@mail.com',
            password: '1234'
        })
    
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('status', 'Success!');
        
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual(expect.any(Object));
    });
})
describe("GET /api/api/v2/auth", ()=> {
    test("GET /api/api/v2/auth - Return status: 200 and Auth Data", async () => {
        const res = await request(app).post('/api/api/v2/auth/login').send({
            email: 'lol@mail.com',
            password: '1233'
        })
    
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('status', 'Fail!');
        
        expect(res.body).toHaveProperty('message');
        
    });
})
describe("GET /api/api/v2/auth", ()=> {
    test("GET /api/api/v2/auth - Return status: 200 and Auth Data", async () => {
        const res = await request(app).post('/api/api/v2/auth/login').send({
            email: 'wadaw@mail.com',
            password: '1233'
        })
    
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('status', 'Fail!');
        
        expect(res.body).toHaveProperty('message');
        
    });
})
//TutupLogin


//TutupAuth