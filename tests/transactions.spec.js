// unit testing
const base = require('../app/controller/api/v2/transactions')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

//get user test
describe("transactions.get function", ()=> {
    test("res.json called with transactions data", async ()=> {
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
})

//create user test
describe("transactions.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            senderId:1,
            receiverId:2,
            jumlah:500000
        })
        const res =mockResponse()
        await base.create(req, res)
        expect(res.status).toBeCalledWith(200)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data ditambah!',
                
            })
        )

    })
})