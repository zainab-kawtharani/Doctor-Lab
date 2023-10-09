import express  from "express";
import { addDoctor,updatedoctor,deleteDoctor,getSingleDoctor,getAllDoctors } from "../Controllers/doctorController.js";


const router = express.Router();
router.post("/doctor",addDoctor);
router.get("/:id",getSingleDoctor);
router.get("/",getAllDoctors);
router.put("/:id",updatedoctor);
router.delete("/:id",deleteDoctor);


export default router;