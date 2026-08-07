import { redis } from "../config/redis.js";

export const set_user_data = async (req, res) => {
    console.log("set_user_data called");
    try {
        const { userId } = req.params;
        const { data } = req.body;
        console.log("req.body =", req.body);
        console.log("data =", data);
        if (data === undefined || data === null) {
            return res.status(400).json({ error: "Data is required in the request body" });
        }

        await redis.set(`user:${userId}:json`, JSON.stringify(data));
        res.status(200).json({ message: `Set redis data in stringified json format for userId - ${userId}` });
    } catch (error) {
        res.status(500).json({ error: "Failed to set user data", details: error.message })
    }
}

export const get_user_data = async (req, res) => {
    console.log("get_user_data called");
    try {
        const { userId } = req.params;
        const data = await redis.get(`user:${userId}:json`);
        if (data) {
            res.status(200).json({ data: JSON.parse(data) });
        }
        else {
            res.status(404).json({ message: "No data found for the given userId" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const hash_user_data = async (req, res) => {
    console.log("hash_user_data called");
    try {
        const { userId } = req.params;
        const { data } = req.body;

        await redis.hset(`user:${userId}:json`, data);
        res.status(200).json({ message: "successfully set redis data in hash format" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const get_hash_user_data = async (req, res) => {
    console.log("get_hash_user_data called");
    try {
        const { userId } = req.params;
        const data = await redis.hgetall(`user:${userId}:json`);
        if (Object.keys(data).length > 0) {
            res.status(200).json({ data });
        }
        else {
            res.status(404).json({ message: "No data found for the given userId" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}