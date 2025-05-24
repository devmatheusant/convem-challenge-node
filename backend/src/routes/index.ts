import { Router } from "express";
import cashInRoutes from "#routes/cashin.routes.js";
import cashOutRoutes from "#routes/cashout.routes.js";

const router = Router();

router.use("/cash-in", cashInRoutes);
router.use("/cash-out", cashOutRoutes);

export default router;
