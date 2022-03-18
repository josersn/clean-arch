import { Response, Request } from "express";
import { AccountRepository } from "../../../../../domain/modules/account/repositories/AccountRepository";
import { CreateAccountService } from "../../../../../domain/modules/account/useCases/createAccount/CreateAccountService";

class AccountController {
    async createAccount(req: Request, res: Response): Promise<Response> {

        const requiredFields = ["name", "cnpj", "description", "logo", "address", "revenue"];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json(`Missing param ${field}`);
            }
        }

        const { name, cnpj, description, logo, address, revenue } = req.body;


        const repository = new AccountRepository();
        const service = new CreateAccountService(repository);

        const account = await service.execute({
            name, cnpj, description, logo, address, revenue
        });

        return res.status(201).json(account);

    }
}

export { AccountController }