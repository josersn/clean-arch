import { Response, Request } from "express";
import { AccountRepository } from "../../../../../domain/modules/account/repositories/AccountRepository";
import { CreateAccountService } from "../../../../../domain/modules/account/useCases/createAccount/CreateAccountService";
import { GetAccountService } from "../../../../../domain/modules/account/useCases/getAccount/GetAccountService";
import { ListAccountService } from "../../../../../domain/modules/account/useCases/listAccounts/ListAccountService";
import { AppError } from "../../error/AppError";

class AccountController {

    async createAccount(req: Request, res: Response): Promise<Response> {

        const requiredFields = ["name", "cnpj", "description", "logo", "address", "revenue"];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                throw new AppError(`Missing param ${field}`)
            }
        }

        const { name, cnpj, description, logo, address, revenue } = req.body;


        const repository = AccountRepository.getInstance();
        const service = new CreateAccountService(repository);

        const account = await service.execute({
            name, cnpj, description, logo, address, revenue
        });

        return res.status(201).json(account);
    }

    async listAccount(req: Request, res: Response): Promise<Response> {
        const repository = AccountRepository.getInstance();
        const service = new ListAccountService(repository);

        const accounts = await service.execute();

        return res.status(201).json(accounts);

    }

    async showAccount(req: Request, res: Response): Promise<Response> {

        const requiredFields = ["id"];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                throw new AppError(`Missing param ${field}`)
            }
        }

        const { id } = req.body;

        const repository = AccountRepository.getInstance();
        const service = new GetAccountService(repository);

        const account = service.execute(id);

        return res.status(201).json(account);
    }
}

export { AccountController }