const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbUrl = "mongodb://localhost:27017/Student"
mongoose.connect(dbUrl)
const connection = mongoose.connection
connection.on('open',()=> console.log('Database Connection Established ...'))
app.listen(9000, () => console.log("Server started on port 9000"))
app.use(express.json())



const studentRouter = require('./Routes/Student.js')
app.use('/students',studentRouter) 


