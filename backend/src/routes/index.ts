import { Router } from "express";
import cashInRoutes from "#routes/cashin.routes.js";

const router = Router();

router.use("/cash-in", cashInRoutes);

export default router;
