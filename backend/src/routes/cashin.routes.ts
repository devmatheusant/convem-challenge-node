import { Router } from "express";
import { generatePix, receiveWebhook } from "#controllers/cashin.controller.js";

const router = Router();

router.post("/request", generatePix);
router.post("/webhook", receiveWebhook);

export default router;
