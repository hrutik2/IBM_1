const mongoose=require("mongoose")

const BookSchema=mongoose.Schema({
        title: String,
        author: String,
        category: String,
        price: Number,
        quantity: Number
      
})

const Book=mongoose.model("book",BookSchema)
module.exports=Book