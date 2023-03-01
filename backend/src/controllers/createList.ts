import { RequestHandler } from "express";
import prisma from '../prisma'

export default <RequestHandler>( async (req, res) => {
    const { title, description } = req.body
    try {
        await prisma.list.create({ // insert into
            data: {
                title: title, 
                description: description, 
            }
        })
        res.status(201).send({
            message: 'เพิ่มข้อมูลเรียบร้อย',
            success: true
        })   
    } catch (error) {
        res.status(500).send({
            message: 'มีบางอย่างผิดพลาด',
            success: false
        })   
    }
})