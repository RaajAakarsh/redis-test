import { redis } from "../config/redis.js";
import mongoose from "mongoose";

// GET /api/v1/health/redis
export const checkRedisHealth = async (req, res) => {
    try {
        const reply = await redis.ping();
        res.json({ redis: reply });
    } catch (error) {
        res.status(500).json({ error: "Redis ping failed", details: error.message });
    }
};

// GET /api/v1/health/mongo
export const checkMongoHealth = (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({
        mongo: isConnected ? "connected" : "disconnected",
        database: mongoose.connection.name || null
    });
};