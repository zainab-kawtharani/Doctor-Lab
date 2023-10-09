import Reviews from "../models/ReviewSchema.js"

export const getAllReview= async(req,res)=>{
    try{
        const review =await Reviews.find({})
        return res.status(200).json({success:true,message:"success",data:review})
    } catch(err){
        return res.status(401).json({success:false,message:"not found"})
    }
}

export const addReview = async(req,res)=>{
    if(!req.body.doctor) req.body.doctor=req.params.doctorId
    if(!req.body.user)req.body.user=req.params.userId
    const newReviews =  new Reviews(req.body);
    try{
       const review = await newReviews.save()
       //update doctor for new revies
       return res.status(200).json({success:false,message:"review added",data:review})
    }catch(err){
        return res.status(500).json({success:false,message:"no review added"})

    }
}