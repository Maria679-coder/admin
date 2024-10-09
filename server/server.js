require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./database/connect')
const router = require('./routes/auth')
const cors = require('cors')
const productRouter = require('./routes/product')
const port = process.env.PORT
connectDB()

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use('/', router)
app.use('/', productRouter)
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})
// MVC{ Model View Controller} is famous architecturec