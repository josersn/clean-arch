import { Account } from "../../entities/Account";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class ListAccountService {

    constructor(private repository: IAccountRepository) {

    }

    async execute(): Promise<Account[]> {
        const accounts = this.repository.listAll();

        return accounts

    }
}

export { ListAccountService }