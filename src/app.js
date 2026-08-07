import express from "express";
import mainRouter from "./routes/index.js";

const app = express();

app.use(express.json());

// Mount the central router under your API base path
app.use("/api/v1", mainRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found - 'app.js file'" });
});

export default app;