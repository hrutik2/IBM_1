const jwt=require("jsonwebtoken")
require('dotenv').config()

const ProtectedRoute=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    console.log(req.body)
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(decoded){
                let isAdmin=decoded.isAdmin
                if(isAdmin===true){
                req.body.user=decoded.userID
                next()
                }
                else{
                    res.send({message: "You are not Admin"})
                }
            }
            else{
                res.status(403).send({message:"Invalid Token"})
            }
        })
    }
    else{
        res.status(403).send({message:"Invalid Token"})
    }
}
module.exports=ProtectedRoute