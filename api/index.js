import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/user.route.js'
import authRoute from './routes/auth.route.js'

dotenv.config()

mongoose.connect(
    process.env.MONGODB_URI
).then(()=>{
    console.log('MongoDB is connected.')
}).catch((err)=>{
    console.error(err)
})

const app = express()

app.use(express.json())

app.listen(9000, ()=>{
    console.log('Server is running on port 9000!!')
})


app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode|| 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
