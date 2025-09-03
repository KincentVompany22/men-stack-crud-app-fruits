
/* --- IMPORTED MODULES --- */

const express = require("express")
const app = express()
const PORT = 3000 // defining PORT as a variable, best practice 

/* --- ROUTES --- */
app.get("/", async (req, res) => {
    res.send("hello, friend!")
})


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`) // see imported modules
})

