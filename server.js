
/* --- IMPORTED MODULES --- */

// Importing Express
const express = require("express")
const app = express()



// Importing .env
const dotenv = require("dotenv") // can also write it as require("dotenv").config()
dotenv.config()
const PORT = process.env.PORT // pulling PORT from .env file
console.log(process.env)

// Importing Mongoose
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI) // connecting to MongoDB database


/* --- ROUTES --- */

app.get("/", async (req, res) => {
    res.send("hello, friend!")
})

/* --- LISTENER --- */

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

