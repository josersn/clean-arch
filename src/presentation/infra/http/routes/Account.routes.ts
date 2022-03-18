import { Router } from "express";
import { AccountController } from "../controllers/accountControllers/AccountController";

const accountRoutes = Router();

const accountController = new AccountController();

accountRoutes.post('/', accountController.createAccount);

export { accountRoutes };