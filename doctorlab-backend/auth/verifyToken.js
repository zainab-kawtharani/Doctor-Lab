import jwt from "jsonwebtoken"
import User from "../models/UserSchema.js"

export const authenticate =async (req,res,next)=>{
    const token =req.header.authorization;
    if(!token || token.startsWith('Bearer')){
        return res.status(401).json({success:false,message:"not authorize"})
    }

    try{
      const verifyToken= token.split(' ')[1]
      const decoded =jwt.verify(verifyToken,process.env.Jwt_SECRET_KEY)
      req.userId=decoded.id

      next();
    }catch(err){
       if(err.name==="TokenExpiredError"){
        return res.status(401).json({message:"token is expired"})

       }
       return res.status(401).json({success:false,message:"invalid token"})

    }
}