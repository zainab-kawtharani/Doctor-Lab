import User from "../models/UserSchema.js"
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"

export const updateUser= async(req,res)=>{
    const id = req.params.id;
    try{
        const updateUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"update sucessfully",data:updateUser})

    }catch(err){
        res.status(500).json({success:false,message:"update failed"})

    }
}
export const deleteUser= async(req,res)=>{
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"deleted sucessfully"})

    }catch(err){
        res.status(500).json({success:false,message:"delete failed"})

    }
}

export const getSingleUser= async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id).select('-password');
        res.status(200).json({success:true,message:"user found",data:user})

    }catch(err){
        res.status(404).json({success:false,message:"user not found"})

    }
}
export const getAllUsers= async(req,res)=>{
   
    try{
        const users = await User.find({}).select('-password');
        res.status(200).json({success:true,message:"users found",data:users})

    }catch(err){
        res.status(404).json({success:false,message:"no users found"})

    }
}

export const getUserProfile = async (req,res)=>{
    const userId=req.userId
    try{
        const user= await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        const[password,... rest]=user._doc
        return res.status(200).json({success:true,message:"profile page is ready",data:{...rest}})

    }catch(err){
        res.status(500).json({success:false,message:"something went weong,cannot get"})

    }
}

export const getMyAppointments = async (req,res)=>{
    try{
        const booking= await Booking.find({user:req.userId})
        const doctorid= booking.map(el=>el.doctor.id)
        const doctor = await Doctor.find({_id:{$in:doctorid}}).select(-password)
        res.status(200).json({success:true,message:"Appointments are getting",data:doctor})


    } catch(err){
        res.status(500).json({success:false,message:"something went weong,cannot get"})


    }
  
}