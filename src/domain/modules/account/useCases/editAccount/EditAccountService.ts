import { Account } from "../../entities/Account"
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";
import { AppError } from "../../../../../presentation/infra/http/error/AppError";

class EditAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string, data: ICreatedAccount): Promise<Account> {

        const account = await this.repository.find(id);

        if (!account) {
            throw new AppError("Account not exists");
        }

        if (!account.available) {
            throw new AppError("Account can not edit");
        }
        
        const accountEdited = await this.repository.update(id, data);

        return accountEdited;
    }
}

export { EditAccountService }