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
        // console.log(res.json.mock)
    }) 
})

// create user test
// emailnya harus diubah agar tidak terjadi eror
describe("users.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            email: "sdmmma@gmail.com",
            name: "Mua",
            password: "1232",
            identity_number: 128123,
            address: "Ngabang",
            identity_type:"SIM" 
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 201,
                message: 'Data ditambahkan!',
                data: expect.any(Object)
            })
        )
        console.log('ini datanya',res.json.mock.calls[0][0].data.id)
        idDele = +res.json.mock.calls[0][0].data.id
    })
})

//error create
describe("users.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            email: "ssasww@gmail.com",
            name: "Mua",
            password: "1232",
            identity_number: 128123,
            address: "Ngabang",
            identity_type:"SIM" 
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'failed',
                code: 400,
                message: 'Gagal menambah data, terdapat data yang kosong atau salah',
            })
        )
        // console.log(res.json.mock.calls[0][0].data.id)
    })
})