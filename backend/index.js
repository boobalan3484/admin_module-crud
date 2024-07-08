const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const path = require('path')

const PORT = process.env.PORT || 2000

// Mongoose Connection
const mongoURL = 'mongodb://0.0.0.0:27017/dealsdray'

mongoose.connect(mongoURL)

let database = mongoose.connection

database.on('error', (err) => {
    console.error(err);
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Server Connection
const app = express()
app.use(cors())
app.use(express.json())


// Use Routes here

const empRoutes = require('./src/routes/empRoute')

app.use("/", empRoutes)

// Static folder
// path to store or retrieve images in public folder
app.use('/uploads', express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

app.use((req, res) => {
    res.status(404)
        .send({
            status: 404,
            message: 'API url not found',
            error: true
        })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})