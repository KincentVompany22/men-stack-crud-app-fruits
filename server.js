
/* ------------ IMPORTED MODULES ------------ */

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

// Importing Fruits Model

const Fruit = require("./models/fruit.js")

// Importing "express.urlencoded" Middleware
    // This middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object.

app.use(express.urlencoded({ extended: false }))



/* ------------ ROUTES ------------ */

app.get("/", async (req, res) => { // rendering the index.ejs page content in the browser
    res.render("index.ejs")
})

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

app.post("/fruits", async (req, res) => { // creating our POST route for the form submission on "fruits/new.ejs"
    console.log(req.body)
    res.redirect("/fruits/new.ejs")
})



/* ------------ LISTENERS ------------ */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

