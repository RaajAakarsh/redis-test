import { redis } from "../config/redis.js";

const BANNER_KEY = "app:banner";

// POST /api/v1/banner
export const setBanner = async (req, res) => {
    try {
        const message = req.body?.message || "Hello World!";
        await redis.set(BANNER_KEY, message);
        res.json({ success: true, set: message });
    } catch (error) {
        res.status(500).json({ error: "Failed to set banner key", details: error.message });
    }
};

// GET /api/v1/banner
export const getBanner = async (req, res) => {
    try {
        const message = await redis.get(BANNER_KEY);
        res.json({ message: message || null });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch banner key", details: error.message });
    }
};

// GET /api/v1/banner/exists
export const checkBannerExists = async (req, res) => {
    try {
        const exists = await redis.exists(BANNER_KEY);
        res.json({ exists: exists === 1 });
    } catch (error) {
        res.status(500).json({ error: "Failed to check key existence", details: error.message });
    }
};

// DELETE /api/v1/banner
export const deleteBanner = async (req, res) => {
    try {
        await redis.del(BANNER_KEY);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete banner key", details: error.message });
    }
};