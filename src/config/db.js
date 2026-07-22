import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

export const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to DB Cluster");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("Mongoose connection lost");
        });

        await mongoose.connect(MONGO_URL);
    } catch (error) {
        console.error("Failed to establish initial MongoDB connection:", error);
        throw error;
    }
};