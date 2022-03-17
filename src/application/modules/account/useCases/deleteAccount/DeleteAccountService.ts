import { Account } from "../../../../../domain/entities/Account";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class DeleteAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string): Promise<Account> {

        const accountEdited = this.repository.delete(id);

        return accountEdited;
    }
}

export { DeleteAccountService }