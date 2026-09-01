import { Router } from "express";
import { validateCard } from "../controllers/validator.controller.js";

const router = Router();

router.post("/validate", validateCard);

export default router;