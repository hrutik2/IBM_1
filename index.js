const express=require("express")
const {connection}=require("./db")
const UserRoutes = require("./routes/userRoutes")
const BookRouter = require("./routes/bookRouter")
const OrderRoutes = require("./routes/orderRoutes")
const app=express()
app.use(express.json())
app.use("/api",UserRoutes)
app.use("/api",BookRouter)
app.use("/api",OrderRoutes)
app.listen(6767,async()=>{
    try {
        await connection
        console.log("run")
    } catch (error) {
        console.log(error)
    }
})