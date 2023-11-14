const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient


module.exports = {
    async get(req, res){
        const bankAccount = await prisma.bankAccount.findMany();
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil menampilkan data',
            data: bankAccount
        })
    },

    async getById(req, res){
        const bankAccount = await prisma.bankAccount.findUnique({
            where: {
                id: +req.params.id,
            },
        })
        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data berhasil ditampilkan!',
            data: bankAccount
        })
    },

    async create(req, res){
        try {
            console.log(req.body)
            const user = await prisma.user.findUnique({
                where: {
                    id: +req.body.userId,
                },
            })
            const bankAccount = await prisma.bankAccount.create({
                data:{
                    bank_name: req.body.bank_name,
                    account_number: req.body.account_number,
                    balance:req.body.balance,
                    userId: +req.body.userId
                }
            });
            return res.status(201).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data ditambahkan!',
                data: bankAccount
            })
        } catch (error) {
            if(acc1 && acc2){
                if(acc1.params.balance>acc2.params.balance){
                    const transaction = await prisma.transaction.create({
                        data:{
                            senderId:req.body.senderId,
                            receiverId:req.body.receiverId,
                            jumlah:req.body.jumlah
                        }
                    })
            
                    const updatedData = await prisma.bankAccount.update({
                        where: {
                            id: +req.params.id,
                        },
                        data: {
                            bank_name: req.params.bank_name,
                            account_number: req.params.account_number,
                            balance: +req.params.balance - req.body.jumlah,
                            userId:+req.params.userId
                        }
                    });
                }
            }
        }
        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data ditambahkan!',
            data: user
        })
    },

    async update(req, res){
        const updatedData = await prisma.user.update({
            where: {
                id: +req.params.id,
            },
            data: req.body
        });
        

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diupdate!',
            data: updatedData
        })
    },

    async destroy(req, res){
        const deletedData = await prisma.user.delete({
            where: {
                id: +req.params.id,
            },
        });
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Success Data terhapus!',
        })
    },
}