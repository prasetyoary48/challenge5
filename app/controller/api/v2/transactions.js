const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient


module.exports = {
    async get(req, res){
        const transaction = await prisma.transaction.findMany();
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil menampilkan data',
            data: transaction
        })
    },

    async getById(req, res){
        const transaction = await prisma.transaction.findUnique(
            {where:
                {
                    id: +req.params.id
                },
                include:{
                    sender:{include:{
                        user:true
                    }},receiver:{include:{
                        user:true
                    }}
                }},
            );
        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data berhasil ditampilkan!',
            data: transaction
        })
        
    },

    async create(req, res){
        try {
            const acc1 = await prisma.bankAccount.findUnique({
                where: {
                    id: +req.body.senderId,
                },
            })
            const acc2 = await prisma.bankAccount.findUnique({
                where: {
                    id: +req.body.receiverId,
                },
            })
            console.log(acc1)
            if(acc1 && acc2){
                if(acc1.balance>acc2.balance){
                    const transaction = await prisma.transaction.create({
                        data:{
                            senderId:req.body.senderId,
                            receiverId:req.body.receiverId,
                            jumlah:req.body.jumlah
                        }
                    })
                    console.log(transaction)
                    const updatedData1 = await prisma.bankAccount.update({
                        where: {
                            id: acc1.id,
                        },
                        data: {
                            bank_name: acc1.bank_name,
                            account_number: acc1.account_number,
                            balance: +acc1.balance - req.body.jumlah,
                            userId:+acc1.userId
                        }
                    });
                    const updatedData2 = await prisma.bankAccount.update({
                        where: {
                            id: acc2.id,
                        },
                        data: {
                            bank_name: acc2.bank_name,
                            account_number: acc2.account_number,
                            balance: +acc2.balance + req.body.jumlah,
                            userId:+acc2.userId
                        }
                    });
                    // console.log(updatedData1)
                }
            } 
            return res.status(200).json({ 
                status: 'success', 
                code: 200, 
                message: 'Data ditambah!',
                
            })
        } catch (error) {
            return res.status(400).json({ 
                status: 'failed', 
                code: 400, 
                message: 'Gagal transaksi',
            })
        }

        
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