// ORGANIZING OUR ROUTES

const express = require("express")

const router = express.Router()

// here we are requiring the fruits model
const Fruit = require("../models/fruit")


/* ------------ ROUTES ------------ */

/* ----- GET ROUTES ----- */

// Initial route to see base index page. Built out further in route below
// app.get("/", async (req, res) => { // rendering the index.ejs page content in the browser
//     res.render("index.ejs")
// })

// Need to change the beginning from "app" to "router" because we defined router above in line 5

router.get("/", async (req,res) => { // render index.ejs template with all the fruits
    const allFruits = await Fruit.find()
    // console.log(allFruits) // just checking that all fruit data is populating in terminal
    res.render("index.ejs", {fruits: allFruits}) // The .render() method takes two arguments:
        // The first argument is a string specifying the path to the EJS template we wish to render. In our case, it’s ‘fruits/index.ejs’.
        // The second argument is an object containing the data we want to pass to the template. 
})

router.get("/new", (req, res) => { // render fruits/new.ejs template with all the fruits
    res.render("fruits/new.ejs")
})

// SHOW Route 
    // to render show.ejs

router.get("/:fruitId",  async (req, res) => {
    // console.log(req.params.fruitId) // testing fruitId is appearing
    const foundFruit = await Fruit.findById(req.params.fruitId)
    res.render("fruits/show.ejs", { fruit: foundFruit })
})

// EDIT Route 
    // to render edit.ejs

router.get("/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    console.log(foundFruit)
    res.render("fruits/edit.ejs", {
        fruit: foundFruit
    })
})

/* ----- POST ROUTE ----- */

router.post("/", async (req, res) => { // creating our POST route for the form submission on "fruits/new.ejs"
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

router.put("/:fruitId", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
   } else {
    req.body.isReadyToEat = false
   }
   await Fruit.findByIdAndUpdate(req.params.fruitId, req.body)
   res.redirect(`/fruits/${req.params.fruitId}`) // directing back to fruit show page
})

/* ----- DELETE ROUTE ----- */

router.delete("/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId)
    res.redirect("/fruits")
})

module.exports = router