import { Account } from "../../../../../domain/entities/Account"
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class EditAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string, data: ICreatedAccount): Promise<Account | undefined> {

        const accountEdited = await this.repository.update(id, data);

        return accountEdited;
    }
}

export { EditAccountService }