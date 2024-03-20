const mongoose=require("mongoose")

const OrderSchema=mongoose.Schema({
       user : { type: String, ref: 'User' },
        books : [{ type: String, ref: 'Book' }],
        totalAmount: Number
   
      
})

const Order=mongoose.model("order",OrderSchema)
module.exports=Order