import { Router } from "express";
import { AccountController } from "../controllers/accountControllers/AccountController";

const accountRoutes = Router();

const accountController = new AccountController();

accountRoutes.post('/', accountController.createAccount);
accountRoutes.get('/', accountController.listAccount);
accountRoutes.get('/:id', accountController.listAccount);
accountRoutes.delete('/:id', accountController.deleteAccount);

export { accountRoutes };