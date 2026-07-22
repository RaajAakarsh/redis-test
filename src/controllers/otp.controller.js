import { redis } from "../config/redis.js";

// Helper function to generate standardized Redis keys
const otpKey = (phone) => `otp:${phone}`;

// POST /api/v1/otp
export const setOtp = async (req, res) => {
    try {
        const phone = req.body?.phone;
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        await redis.set(otpKey(phone), otp, "EX", 30); // Expires in 30 seconds

        res.json({ success: true, phone, otp });
    } catch (error) {
        res.status(500).json({ error: "Failed to set OTP", details: error.message });
    }
};

// POST /api/v1/otp/verify
export const verifyOtp = async (req, res) => {
    try {
        const phone = req.body?.phone;
        const otp = req.body?.otp;

        if (!phone || !otp) {
            return res.status(400).json({ success: false, message: "Phone and OTP are required" });
        }

        const setOtp = await redis.get(otpKey(phone));

        if (!setOtp) {
            return res.status(400).json({ success: false, message: "OTP expired or not set" });
        }

        if (setOtp === otp) {
            await redis.del(otpKey(phone)); // One-time use: Delete immediately after verification
            return res.json({ success: true, message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to verify OTP", details: error.message });
    }
};

// GET /api/v1/otp/:phone/ttl
export const getOtpTtl = async (req, res) => {
    try {
        const phone = req.params.phone;
        const ttl = await redis.ttl(otpKey(phone));

        if (ttl === -2) {
            return res.status(404).json({ success: false, message: "OTP not found or expired" });
        } else if (ttl === -1) {
            return res.status(200).json({ success: true, message: "OTP exists but has no expiration" });
        } else {
            return res.json({ success: true, phone, ttl });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to get OTP TTL", details: error.message });
    }
};