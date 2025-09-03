
/* ------------ IMPORTING MODULES ------------ */

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

// Importing Method-Override

const methodOverride = require("method-override")
    // Allows us to set up PUT and DELETE routes through a form
    // GET and POST are built into forms, but not PUT and DELETE

// Importing Morgan Middlewear

const morgan = require("morgan") 

// Importing Fruits Model

const Fruit = require("./models/fruit.js")

// Controllers
    // Importing the fruit controller that now holds all of our routes

const fruitsController = require("./controllers/fruit.js")

// Using Middleware
    
app.use(express.urlencoded({ extended: true })) // "express.urlencoded" middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object.
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static("public")) // Importing Public Directory - to use CSS

app.use("/fruits", fruitsController) // when you see the URL that starts with /fruits - use this router

/* ------------ LISTENERS ------------ */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})


