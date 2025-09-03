/* --- CREATING FRUIT MODEL --- */

const mongoose = require("mongoose")

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

const Fruit = mongoose.model("Fruit", fruitSchema) // from our schema, creating our fruit model

module.exports = Fruit