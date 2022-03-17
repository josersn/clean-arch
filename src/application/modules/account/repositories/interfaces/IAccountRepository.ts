import { Account } from "../../../../../domain/entities/Account";
import { ICreatedAccount } from "../../dtos/ICreateAccount";

interface IAccountRepository {
    create(data: ICreatedAccount): Promise<Account>;
    findByCNPJ(cnpj: string): Promise<Account | undefined>;
    find(id: string | undefined): Promise<Account | undefined>
}

export { IAccountRepository };