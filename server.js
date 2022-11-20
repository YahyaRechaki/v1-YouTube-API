require("dotenv").config()
const express = require("express")
const app = express() // Create an Express application, The express() function is a top-level function exported by the express module
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
// .then((response) => {
//     console.log("response from mongodb, Object.keys(response): " , Object.keys(response))
// })
// .catch(err => console.log('err from mongoose: ', err))
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected Remotly to MongoDB Atlasian database.'))

// Create routes for our server, and set it up to accept JSON
app.use(express.json())

const suscribersRouter = require('./routes/subscribers')
app.use('/subscribers', suscribersRouter)

const appListen = app.listen(3000, () => console.log("Salam, server is running."))