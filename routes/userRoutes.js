const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const User = require("../Models/User-Model");
require('dotenv').config()
const UserRoutes=express.Router()

UserRoutes.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin}=req.body
    try {
        const user=await User.findOne({name,email})
        if(user){
            res.status(400).send("user already exist")
        }
        else{
            const hash =  await bcrypt.hash(password, 3)
            console.log(hash)
            const  newUSer=new User({name,email,isAdmin,password:hash})
            await newUSer.save()
            res.status(201).send({"msg":"The new user has been registered", "registeredUser":newUSer})
        }
        
    } catch (error) {
        res.send(error)
    }
})
UserRoutes.post("/login",async(req,res)=>{
    const {email,password,}=req.body
    try {
        const user=await User.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, (err, result)=> {
                
                if(err){
                    res.status(400).send("wrong credential")  
                }
                else{
                    const token = jwt.sign({userID:user._id,isAdmin:user.isAdmin },process.env.SECRET_KEY);
                    res.status(201).send({"mag":"login successfully","token":token})
                }
            })
        }
        else{
            
            res.status(400).send("user need to register first")
        }
        
    } catch (error) {
        res.send(error)
    }
})

module.exports=UserRoutes