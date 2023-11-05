// unit testing
const base = require('../app/controller/api/v2/users')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

//get user test
describe("users.get function", ()=> {
    test("res.json called with users data", async ()=> {
        const req =mockRequest()
        const res =mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Berhasil menampilkan data',
                data: expect.any(Array)
            })
        )

    })
    test("res.json called with no result", async ()=> {
        const req =mockRequest({}, {
            page:3,
            limit:6
        })
        const res =mockResponse()
        await base.get(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Berhasil menampilkan data',
                data: expect.any(Array)
            })
        )

    })
})

//create user test
// describe("users.create function", ()=> {
//     test("res.json called with status 201", async ()=> {
//         const req =mockRequest({
//             email: "jsjanmsm@gmail.com",
//             name: "Mua",
//             password: "1232",
//             identity_number: 128123,
//             address: "Ngabang",
//             identity_type:"SIM"
            
//         })
//         const res =mockResponse()
//         await base.create(req, res)
//         expect(res.status).toBeCalledWith(201)
//         expect(res.json).toBeCalledWith(
//             expect.objectContaining({
//                 status: 'success',
//                 code: 201,
//                 message: 'Data ditambahkan!',
//                 data: expect.any(Object)
//             })
//         )

//     })
// })