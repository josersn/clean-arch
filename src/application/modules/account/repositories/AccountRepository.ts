import { Account } from "../../../../domain/entities/Account";
import { ICreatedAccount } from "../dtos/ICreateAccount";
import { IAccountRepository } from "./interfaces/IAccountRepository";

class AccountRepository implements IAccountRepository {

    public accounts: Account[] = [];

    async create({ name, description, address, cnpj, logo, revenue }: ICreatedAccount): Promise<Account> {
        const account = new Account();

        Object.assign(account, {
            name,
            description,
            address,
            cnpj,
            logo,
            revenue,
            created_at: new Date()
        });

        this.accounts.push(account);

        return account;
    }

    async findByCNPJ(cnpj: string): Promise<Account | undefined> {
        const account = this.accounts.find(item => item.cnpj === cnpj);

        return account;

    }
}

export {
    AccountRepository
}