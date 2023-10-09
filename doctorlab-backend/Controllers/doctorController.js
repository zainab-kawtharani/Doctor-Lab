import Doctor from "../models/DoctorSchema.js";

export const addDoctor= async(req,res)=>{
    const {email,password,name,gender,photo} = req.body;

    try{
      
       const salt =await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt)
       const doctor= new Doctor({
        name,
        email,
        password:hashedPassword,
        gender,
        photo
       })

       await doctor.save();
       res.status(200).json({success:true,message:"user added successfully"})
    }catch(err){
        res.status(500).json({success:false,message:"internal server error! try  again"})


    }
}
export const updatedoctor= async(req,res)=>{
    const id = req.params.id;
    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:"update sucessfully",data:updateDoctor})

    }catch(err){
        res.status(500).json({success:false,message:"update failed"})

    }
}
export const deleteDoctor= async(req,res)=>{
    const id = req.params.id;
    try{
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"deleted sucessfully"})

    }catch(err){
        res.status(500).json({success:false,message:"delete failed"})

    }
}

export const getSingleDoctor= async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await Doctor.findById(id).select('-password');
        res.status(200).json({success:true,message:"user found",data:user})

    }catch(err){
        res.status(404).json({success:false,message:"user not found"})

    }
}
export const getAllDoctors= async(req,res)=>{
   
    try{
        const {query} =req.query
        let doctors;
        if(query){
            doctors=await Doctor.find({isApproved:'approved',
            $or:[
                {name:{$regex:query,$options:"i"}},
                {specialization:{$regex:query,$options:"i"}}
            ],
        }).select(-password);
        }else{
            const doctors = await Doctor.find({}).select('-password');
        }
       
        res.status(200).json({success:true,message:"users found",data:doctors})

    }catch(err){
        res.status(404).json({success:false,message:"no users found"})

    }
}