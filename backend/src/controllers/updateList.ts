import { RequestHandler } from "express";
import prisma from "../prisma";

export default <RequestHandler>(async (req, res) => {
    const updateUser = await prisma.list.update({
        where: {
            id: +req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        }
    })
    res.status(200).send({
        message: 'Update Successfully',
        success: true
    })
})