import { Account } from "../entities/Account";
import { ICreatedAccount } from "../dtos/ICreateAccount";
import { IAccountRepository } from "./interfaces/IAccountRepository";
import { constants } from "../../../constants";

class AccountRepository implements IAccountRepository {

    public accounts: Account[];

    private static selfInstance: AccountRepository;

    constructor() {
        this.accounts = []
    }

    public static getInstance(): AccountRepository {
        if (!AccountRepository.selfInstance) {
            AccountRepository.selfInstance = new AccountRepository();
        }

        return AccountRepository.selfInstance;
    }

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
        const account = this.accounts.find(item => item.id);

        return account;
    }

    async findByCNPJ(cnpj: string): Promise<Account | undefined> {
        const account = this.accounts.find(item => item.cnpj === cnpj);

        return account;

    }

    async listAll(): Promise<Account[]> {
        const accounts = this.accounts.filter(item => item.available === constants.USER_AVAILABLE);

        return accounts;
    }

    async update(data: Account): Promise<Account> {
        const accountIndex = this.accounts.findIndex(account => account.id === data.id);

        this.accounts[accountIndex] = data;
        this.accounts[accountIndex].available = constants.USER_AVAILABLE;

        return data;
    }

    async delete(id: string): Promise<Account> {
        const accountIndex = this.accounts.findIndex(account => account.id === id);

        this.accounts[accountIndex].available = constants.USER_UNAVAILABLE;

        return this.accounts[accountIndex];
    }
}

export {
    AccountRepository
}