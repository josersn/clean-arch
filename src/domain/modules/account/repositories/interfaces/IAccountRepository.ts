import { Account } from "../../entities/Account";
import { ICreatedAccount } from "../../dtos/ICreateAccount";

interface IAccountRepository {
    create(data: ICreatedAccount): Promise<Account>;
    findByCNPJ(cnpj: string): Promise<Account | undefined>;
    find(id: string | undefined): Promise<Account | undefined>;
    listAll(): Promise<Account[]>;
    update(id: string, data: ICreatedAccount): Promise<Account>;
    delete(id: string): Promise<Account>;
}

export { IAccountRepository };