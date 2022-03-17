import { Account } from "../../../../../domain/entities/Account";
import { ICreatedAccount } from "../../dtos/ICreateAccount";

interface IAccountRepository {
    create(data: ICreatedAccount): Promise<Account>;
    findByCNPJ(cnpj: string): Promise<Account | undefined>;
}

export { IAccountRepository };