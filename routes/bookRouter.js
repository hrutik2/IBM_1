const express=require("express");
const Book = require("../Models/Book-Model");
const ProtectedRoute = require("../middleware/Private");

const BookRouter=express.Router()

BookRouter.get("/books",async(req,res)=>{
    try {
        const Books=await Book.find(req.query)
        res.status(200).send(Books)
    } catch (error) {
        res.send(error)
    }
})
BookRouter.get("/books/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const Books=await Book.findOne({_id:id})
        res.status(200).send(Books)
    } catch (error) {
        res.send(error)
    }
})
BookRouter.post("/books",ProtectedRoute,async(req,res)=>{
    try {
        const newBook=new Book(req.body)
        await newBook.save()
        res.status(201).send({"m":"Book Add succefully","book":newBook})
    } catch (error) {
        res.send(error)
    }
})
BookRouter.delete("/books/:id",ProtectedRoute,async(req,res)=>{
    const{id}=req.params
    try {
        await Book.findByIdAndDelete({_id:id})
        res.status(202).send("Book is Remove")
    } catch (error) {
        res.send(error)
    }
})
BookRouter.patch("/books/:id",ProtectedRoute,async(req,res)=>{
    const{id}=req.params
    try {
        const updatedBook=await Book.findByIdAndUpdate({_id:id},req.body)
        res.status(204).send({"m":"book is update","data":updatedBook})
    } catch (error) {
        res.send(error)
    }
})

module.exports=BookRouter