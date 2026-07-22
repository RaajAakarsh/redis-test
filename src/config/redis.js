import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

export const redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on("connect", () => {
    console.log("Connecting to Redis server...");
});

redis.on("ready", () => {
    console.log("Redis client ready for commands");
});

redis.on("error", (err) => {
    console.error("Redis error:", err.message);
});

redis.on("end", () => {
    console.warn("Redis connection closed");
});