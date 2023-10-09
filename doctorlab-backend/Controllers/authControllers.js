// logina and registeration
import User from "../models/UserSchema.js"
import Doctor from "../models/DoctorSchema.js"
import  jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const generateToken=user=>{
    return jwt.sign({id:user._id},process.env.Jwt_SECRET_KEY,{
        expiresIn:'15d',
    })

}

export const register = async(req,res)=>{
    const {email,password,name,gender,photo} = req.body;

    try{
       let user=null
       if(user){
        return res.status(400).json({message:"user already exists"})
       }
       const salt =await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)
       user = new User({
        name,
        email,
        password:hashedPassword,
        gender,
        photo
       })

       await user.save();
       res.status(200).json({success:true,message:"user added successfully"})
    }catch(err){
        res.status(500).json({success:false,message:"internal server error! try  again"})


    }
}

export const login = async(req,res)=>{
    const{email,password} = req.body
    try{
        
        const user= await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const isPasswordMatched =await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordMatched){
            return res.status(400).json({status:false,message:"incorect password"})
        }
        //generate token
        const token = generateToken(user)
        const{password,gender, ...rest}=user._doc;
        res.status(200).json({success:true,message:"user logged in sucessfully",token,data:{...rest}})

    }catch(err){
        res.status(500).json({success:false,message:"failed to login"})


    }
}