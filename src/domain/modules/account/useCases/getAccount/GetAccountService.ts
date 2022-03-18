import { AppError } from "../../../../../presentation/infra/http/error/AppError";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class GetAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string | undefined): Promise<Account | undefined> {
        const account = await this.repository.find(id);

        if(!account?.available) {
            throw new AppError("Account not available");
        }

        return account;
    }
}

export { GetAccountService }