import { Router } from "express";
import {
  requestCashOut,
  receiveCashOutWebhook,
} from "#controllers/cashout.controller.js";

const router = Router();

router.post("/request", requestCashOut);
router.post("/webhook", receiveCashOutWebhook);

export default router;
