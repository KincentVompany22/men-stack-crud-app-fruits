
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

// Using Middleware
    
app.use(express.urlencoded({ extended: true })) // "express.urlencoded" middleware parses incoming request bodies, extracting form data and converting it into a JavaScript object.
app.use(methodOverride("_method"))
app.use(morgan("dev"))

/* ------------ ROUTES ------------ */

/* ----- GET ROUTES ----- */

// Initial route to see base index page. Built out further in route below
// app.get("/", async (req, res) => { // rendering the index.ejs page content in the browser
//     res.render("index.ejs")
// })

app.get("/fruits", async (req,res) => { // render index.ejs template with all the fruits
    const allFruits = await Fruit.find()
    // console.log(allFruits) // just checking that all fruit data is populating in terminal
    res.render("index.ejs", {fruits: allFruits}) // The .render() method takes two arguments:
        // The first argument is a string specifying the path to the EJS template we wish to render. In our case, it’s ‘fruits/index.ejs’.
        // The second argument is an object containing the data we want to pass to the template. 
})

app.get("/fruits/new", (req, res) => { // render fruits/new.ejs template with all the fruits
    res.render("fruits/new.ejs")
})

// SHOW Route 
    // to render show.ejs

app.get("/fruits/:fruitId",  async (req, res) => {
    // console.log(req.params.fruitId) // testing fruitId is appearing
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render("fruits/show.ejs", { fruit: foundFruit })
})

// EDIT Route 
    // to render edit.ejs

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    res.render("fruits/edit.ejs", {
        fruit: foundFruit
    })
})

/* ----- POST ROUTE ----- */

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
    res.redirect("/fruits") // redirects the user back to the index page (best practice for form submissions)
})


/* ----- PUT ROUTE ----- */

app.put("/fruits/:fruitId", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
   } else {
    req.body.isReadyToEat = false
   }
   await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
   res.redirect(`/fruits/${req.params.fruitId}`) // directing back to fruit show page
})

/* ----- DELETE ROUTE ----- */

app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect("/fruits")
})



/* ------------ LISTENERS ------------ */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

