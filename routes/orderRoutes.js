const express=require("express");
const ProtectedRoute = require("../middleware/Private");
const Order = require("../Models/Order-Model");
const Book = require("../Models/Book-Model");


const OrderRoutes=express.Router()

OrderRoutes.post("/order",ProtectedRoute,async(req,res)=>{
    const{user,books}=req.body
    console.log(books,user)

    try {
        const User=await Order.findOne({user})
        if(User){
            let orderbook=[...User.books]
            let Amount=User.totalAmount
            let book=await Book.findOne({_id:books})
            if(book){
                Amount=Amount+(book.price)
                orderbook.push(books)
              }
            
            await Order.findByIdAndUpdate({_id:User._id},{
                user:user,
                books:orderbook,
                totalAmount:Amount
            })
            res.status(201).send("order placed succefully")
            
        }
        else{
           let orderbook=[]
           let Amount=0
           let book=await Book.findOne({_id:books})
            if(book){
                console.log(book)
              Amount=Amount+(book.price)
              orderbook.push(book._id)
            }
          
          const neworder=new Order({
            user:user,
            books:orderbook,
            totalAmount:Amount

          })
          await neworder.save()
          res.status(201).send("order placed succefully")

        }
        
    } catch (error) {
        res.send(error)
    }
})

OrderRoutes.get("/orders",ProtectedRoute,async(req,res)=>{
    const{user}=req.body

    try {
        const User=await Order.findOne({user})
        if(User){
        res.status(200).send(User)
        }
        else{
            res.send("no order found")
        }
        
    } catch (error) {
        res.send(error)
    }
})

module.exports=OrderRoutes