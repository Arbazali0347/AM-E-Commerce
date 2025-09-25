import express from "express";
import { createBulkDeal, getAllBulkDeals, deleteBulkDeal } from "../controllers/bulkDeal.controller.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/",authUser, createBulkDeal);
router.get("/",adminAuth, getAllBulkDeals);
router.post("/:id", adminAuth,deleteBulkDeal); // ❌ delete

export default router;
