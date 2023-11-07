// unit testing
const base = require('../app/controller/api/v2/bank_accounts')
const mockRequest = (body = {}, query = {}, params = {}) => ({ body, query, params })
const mockResponse = () => {
    const res = {}
    res.json = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    return res
}

//get 
describe("bank_accounts.get function", ()=> {
    test("res.json called with bank_accounts data", async ()=> {
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

describe("accounts.create function", ()=> {
    test("res.json called with status 201", async ()=> {
        const req =mockRequest({
            bank_name: "BRI",
            account_number: 29201,
            balance: 1000000,
            userId:1
        })
        const res =mockResponse()
        await base.create(req, res)
       
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledWith(
            expect.objectContaining({
                status: 'success',
                code: 200,
                message: 'Data ditambahkan!',
                data: expect.any(Object)
            })
        )
    })
  
})
