
/* --- IMPORTED MODULES --- */

// Importing Express
const express = require("express")
const app = express()

// Importing .env
const dotenv = require("dotenv") // can also write it as require("dotenv").config()
dotenv.config()
const PORT = process.env.PORT // pulling PORT from .env file
// console.log(process.env) // just to test

// Importing Mongoose - Database Setup
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI) // connecting to MongoDB database

const db = mongoose.connection
db.on("error", (err) => {console.log("ERROR: ", err)}) // connection message that will print to our terminal when there is an error
db.on("connected", () => {console.log(`Conntected to MongoDB ${mongoose.connection.name}.`)}) // connection message that will print to our terminal when we’ve connected to the database
db.on("disconnected", () => {console.log("mongo disconnected")}) // connection message that will print to our terminal when we’ve disconnected


/* --- ROUTES --- */

app.get("/", async (req, res) => { // rendering the index.ejs page content in the browser
    res.render("index.ejs")
})

/* --- LISTENER --- */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

