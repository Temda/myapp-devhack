import { RequestHandler } from "express";
import prisma from '../prisma'
import { omit } from 'lodash'

export default <RequestHandler>( async (req, res) => {
    const result = await prisma.list.findMany({
        orderBy: {
            id: "desc"
        }
    }) // select *
    
    res.status(200).json({
        success: true,
        data: result
    });

})