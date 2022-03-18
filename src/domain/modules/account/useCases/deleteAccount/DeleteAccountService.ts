import { AppError } from "../../../../../presentation/infra/http/error/AppError";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class DeleteAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string): Promise<Account> {

        const account = await this.repository.find(id);

        if (!account) {
            throw new AppError("Account not exists");
        }

        const accountEdited = this.repository.delete(id);

        return accountEdited;
    }
}

export { DeleteAccountService }