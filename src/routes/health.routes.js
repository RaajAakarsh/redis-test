import { Router } from "express";
import { checkRedisHealth, checkMongoHealth } from "../controllers/health.controller.js";

const router = Router();

// GET /api/v1/health/redis
router.get("/redis", checkRedisHealth);

// GET /api/v1/health/mongo
router.get("/mongo", checkMongoHealth);

export default router;
