import { Router } from "express";
import bannerRoutes from "./banner.routes.js";
import otpRoutes from "./otp.routes.js";
import healthRoutes from "./health.routes.js"; // Optional: for redis/mongo health checks

const router = Router();

// Mount individual feature routers under dedicated paths
router.use("/health", healthRoutes);
router.use("/banner", bannerRoutes);
router.use("/otp", otpRoutes);

export default router;