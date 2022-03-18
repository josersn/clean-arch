import { Router } from "express";
import { accountRoutes } from "./Account.routes";

const router = Router();

router.use("/account", accountRoutes)

export { router };