import express, { request } from 'express'
import dotenv from 'dotenv'
import router from './router'
import prisma  from './prisma'

// const redis = require('redis')
// const redisClinet = redis.createClient()
// redisClinet.on('error', (error:Error) => {
//     console.log('redis error->', error)
// })

dotenv.config()
const port = process.env.PORT ? +process.env.PORT : 4000

async function Server() {
    // connect Database !!!
    await prisma.$connect()
    // *****
    
    const app = express()
    app.use(express.json())
    
    app.use(router)

    app.listen(port, () => {
        console.log(`Server Running at Port ${port}`)
    })
    
}

Server()
    
