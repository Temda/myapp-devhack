import { RequestHandler } from "express";
import prisma from '../prisma'

export default <RequestHandler>( async (req, res) => {
    const deleteUser = await prisma.list.delete({ // delete
        where: {
            id: +req.params.id,
        },
    })
    res.status(200).send({
        message: 'Delete Successfully',
        success: true
    })

})