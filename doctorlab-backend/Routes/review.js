import express  from "express";
import { getAllReview,addReview } from "../Controllers/reviewController.js";

///AUTHORIZEEEE
const router = express.Router();
router.post('/review',addReview);
router.get("/",getAllReview);


export default router;