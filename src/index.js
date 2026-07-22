import app from "./app.js";
import { connectDB } from "./config/db.js";
import { redis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // 1. Connect to MongoDB
        await connectDB();
        console.log("✅ MongoDB connected successfully");

        // 2. Verify Redis Connection
        const redisStatus = await redis.ping();
        console.log(`✅ Redis connected successfully (Ping: ${redisStatus})`);

        // 3. Start Express HTTP Listener
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

        // 4. Graceful Shutdown (Triggers on Ctrl+C or Docker Stop)
        const shutdown = async (signal) => {
            console.log(`\n${signal} received. Closing HTTP server and connections...`);
            
            server.close(async () => {
                console.log("HTTP server closed.");
                
                try {
                    await redis.quit();
                    console.log("Redis connection closed.");
                    
                    const { default: mongoose } = await import("mongoose");
                    await mongoose.connection.close();
                    console.log("MongoDB connection closed.");
                    
                    process.exit(0);
                } catch (err) {
                    console.error("Error during graceful shutdown:", err);
                    process.exit(1);
                }
            });
        };

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));

    } catch (error) {
        console.error("💥 Fatal error during server startup:", error);
        process.exit(1);
    }
}

startServer();