import { Account } from "../../../../../domain/entities/Account";
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { AccountValidator } from "../../helpers/AccountValidators";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";

class CreateAccountService {

    constructor(
        private repository: IAccountRepository,
        private helper: AccountValidator
    ) { }

    async execute({ name, cnpj, description, logo, address, revenue }: ICreatedAccount): Promise<Account> {

        const accountAlreadyExists = await this.repository.findByCNPJ(cnpj);

        if (accountAlreadyExists) {
            throw new Error("User Already Exists");
        }

        const cnpjIsValid = this.helper.cnpjIsValid(cnpj);

        if (!cnpjIsValid) {
            throw new Error("Company CPNJ is invalid ");
        }

        const account = await this.repository.create({
            name,
            cnpj,
            description,
            logo,
            address,
            revenue
        })

        return account;
    }
}

export { CreateAccountService }