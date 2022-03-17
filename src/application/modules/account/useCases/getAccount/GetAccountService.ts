import { Account } from "../../../../../domain/entities/Account";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class GetAccountService {

    constructor(private repository: IAccountRepository) { }

    async execute(id: string | undefined): Promise<Account | undefined> {
        const account = await this.repository.find(id);

        return account;
    }
}

export { GetAccountService }