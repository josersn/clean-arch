import { Account } from "../../entities/Account"
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class EditAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string, data: ICreatedAccount): Promise<Account> {

        const account = await this.repository.find(id);;

        if(!account) {
            throw  new Error("Account not exists");
        }

        const accountEdited = await this.repository.update(id, data);

        return accountEdited;
    }
}

export { EditAccountService }