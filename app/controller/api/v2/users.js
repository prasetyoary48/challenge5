const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient


module.exports = {
    async get(req, res){
        const user = await prisma.user.findMany({
            include: {
                profile: true, 
                bankAccount:true
            },
            
        });
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil menampilkan data',
            data: user
        })
    },

    async getById(req, res){
        const user = await prisma.user.findUnique({
            where: {
                id: +req.params.id,
            },
            include: {
                profile: true
            },
            include:{
                bankAccount: true
            }
        })
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data berhasil ditampilkan!',
            data: user
        })  
    },

    async create(req, res){
        console.log(req.body)
        try {
            const user=await prisma.user.create({
                data: 
                {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    profile: 
                    {
                      create: 
                        {
                            identity_number: req.body.identity_number,
                            address: req.body.address,
                            identity_type:req.body.identity_type
                        }
                    }
                },
                include:{
                    profile:true
                }
                
            })
            return res.status(201).json({ 
                status: 'success', 
                code: 201, 
                message: 'Data ditambahkan!',
                data: user
            })
        } catch (error) {
            return res.status(400).json({ 
                status: 'failed', 
                code: 400, 
                message: 'Gagal menambah data, terdapat data yang kosong atau salah',

            })
        }        
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