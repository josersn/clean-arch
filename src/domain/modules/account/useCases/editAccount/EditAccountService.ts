import { Account } from "../../entities/Account"
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";
import { AppError } from "../../../../../infrastructure/http/error/AppError";

class EditAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(data: Account): Promise<Account> {

        const account = await this.repository.find(data.id);

        if (!account) {
            throw new AppError("Account not exists");
        }

        if (!account.available) {
            throw new AppError("Account can not edit");
        }
        
        const accountEdited = await this.repository.update(data);

        return accountEdited;
    }
}

export { EditAccountService }