import { RequestHandler } from "express";
import prisma from "../prisma";

export default <RequestHandler>( async (req, res) => {
    const result = await prisma.list.findUnique({
        where: {
            id: +req.params.id
        }
    })

    res.send({
        result
    })
})