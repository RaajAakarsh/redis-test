import { Router } from "express";
import {
    set_user_data,
    get_user_data,
    hash_user_data,
    get_hash_user_data
} from "../controllers/user.controller.js";

const router = Router();

router.post("/set/:userId", set_user_data);
router.get("/get/:userId", get_user_data);
router.post("/hash/:userId", hash_user_data);
router.get("/hash/:userId", get_hash_user_data);

export default router;