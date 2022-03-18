import { Account } from "../entities/Account";
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

    async find(id: string): Promise<Account | undefined> {
        const account = this.accounts.find(item => item.id === id);

        return account;
    }

    async findByCNPJ(cnpj: string): Promise<Account | undefined> {
        const account = this.accounts.find(item => item.cnpj === cnpj);

        return account;

    }

    async listAll(): Promise<Account[]> {
        return this.accounts.filter(item => item.available === 1);
    }

    async update(id: string, data: Account): Promise<Account> {
        const accountIndex = this.accounts.findIndex(account => account.id === id);

        this.accounts[accountIndex] = data;
        this.accounts[accountIndex].available = 1;

        return data;
    }

    async delete(id: string): Promise<Account> {
        const accountIndex = this.accounts.findIndex(account => account.id === id);

        this.accounts[accountIndex].available = 0;

        return this.accounts[accountIndex];
    }
}

export {
    AccountRepository
}