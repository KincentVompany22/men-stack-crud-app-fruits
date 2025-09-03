
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

// Importing Fruits Model

const Fruit = require("./models/fruit.js")

// Importing Middleware
    
app.use(express.urlencoded({ extended: true })) // "express.urlencoded" middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object.


/* ------------ ROUTES ------------ */

// GET routes

app.get("/", async (req, res) => { // rendering the index.ejs page content in the browser
    res.render("index.ejs")
})

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

// POST route

app.post("/fruits", async (req, res) => { // creating our POST route for the form submission on "fruits/new.ejs"
   // console.log(req.body) // just testing form submission info is coming back as an object
   if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
   } else {
    req.body.isReadyToEat = false
   }
   // the ternary operator below would also work in place of if/else statement above:
    // req.body.isReadyToEat === "on" ? req.body.isReadyToEat = true : req.body.isReadyToEat = false

   // Using try...catch logic to run different actions in case there is an error
   try {
        const newFruit =  await Fruit.create(req.body) // Fruit.create() is an asynchronous operation; we use await to ensure the database operation completes before the function continues.
        console.log(newFruit)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }    
    res.redirect("/fruits/new") // redirects the user back to the form page (best practice for form submissions)
})


/* ------------ LISTENERS ------------ */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

