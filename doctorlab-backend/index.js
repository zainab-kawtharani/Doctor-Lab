import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/user.js"
import doctorRoute from "./Routes/doctors.js"
import reviewRoute from "./Routes/review.js"

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

const corsOptions={
    origin:true,
}
app.get("/",(req,res)=>{
    res.send("api is working")
});

mongoose.set('strictQuery',false);
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true

        })
        console.log("db connect is connected")

    } catch(err){
       
        console.log("db connetion is failed")

    }
}

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute)
app.listen(port,()=>{
    connectDb();
    console.log("server is running on port" +port);
})