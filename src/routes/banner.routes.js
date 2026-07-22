import { Router } from "express";
import { 
    setBanner, 
    getBanner, 
    checkBannerExists, 
    deleteBanner 
} from "../controllers/banner.controller.js";

const router = Router();

router.post("/", setBanner);
router.get("/", getBanner);
router.get("/exists", checkBannerExists);
router.delete("/", deleteBanner);

export default router;