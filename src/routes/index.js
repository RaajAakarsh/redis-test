import { Router } from "express";
import bannerRoutes from "./banner.routes.js";
import otpRoutes from "./otp.routes.js";
import healthRoutes from "./health.routes.js"; 
import userRoutes from "./user.routes.js";

const router = Router();

// Mount individual feature routers under dedicated paths
router.use("/health", healthRoutes);
router.use("/banner", bannerRoutes);
router.use("/otp", otpRoutes);
router.use("/user", userRoutes); 

export default router;