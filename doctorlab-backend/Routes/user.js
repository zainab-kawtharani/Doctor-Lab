import  express from "express";
import { updateUser,deleteUser,getSingleUser,getAllUsers,getUserProfile,getMyAppointments } from "../Controllers/userControllers.js";
import { authenticate } from "../auth/verifyToken.js";

const router =express.Router();
router.get("/:id",authenticate,getSingleUser);
router.get("/",getAllUsers);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
router.get("/profile/me",getUserProfile);
router.get("appointments/my-appointment",getMyAppointments)


export default router;