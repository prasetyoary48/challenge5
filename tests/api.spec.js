const request = require('supertest')
const app = require('../index')

describe("GET /api/v2/users", ()=> {
    test("Return status: 200 and Users Data", async ()=> {
        const res = await request(app).get('/api/v2/users')
        // console.log(res)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('status')
        expect(res.body).toHaveProperty('code')
        expect(res.body).toHaveProperty('message')
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toEqual(expect.any(Array))

        // expect(res.body).toBe(
        //     expect.objectContaining({
        //         status: 'success',
        //         code: 200,
        //         message: 'Berhasil menampilkan data',
        //         data: expect.any(Array)
        //     })
        // )

    })
    // test("res.json called with no result", async ()=> {
    //     const req =mockRequest({}, {
    //         page:3,
    //         limit:6
    //     })
    //     const res =mockResponse()
    //     await base.get(req, res)
    //     expect(res.status).toBeCalledWith(200)
    //     expect(res.json).toBeCalledWith(
    //         expect.objectContaining({
    //             status: 'success',
    //             code: 200,
    //             message: 'Berhasil menampilkan data',
    //             data: expect.any(Array)
    //         })
    //     )

    // })
})