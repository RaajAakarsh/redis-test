import { Router } from "express";
import { 
    setOtp, 
    verifyOtp, 
    getOtpTtl 
} from "../controllers/otp.controller.js";

const router = Router();

router.post("/", setOtp);
router.post("/verify", verifyOtp);
router.get("/:phone/ttl", getOtpTtl);

export default router;