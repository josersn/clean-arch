import { Account } from "../../entities/Account";
import { ICreatedAccount } from "../../dtos/ICreateAccount";
import { AccountValidator } from "../../helpers/AccountValidators";
import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository";
import { AppError } from "../../../../../infrastructure/http/error/AppError";

class CreateAccountService {

    private helper: AccountValidator = new AccountValidator();

    constructor(
        private repository: IAccountRepository
    ) { }

    async execute({ name, cnpj, description, logo, address, revenue }: ICreatedAccount): Promise<Account> {

        const accountAlreadyExists = await this.repository.findByCNPJ(cnpj);

        if (accountAlreadyExists) {
            throw new AppError("Company Already Exists");
        }

        const cnpjIsValid = this.helper.cnpjIsValid(cnpj);

        if (!cnpjIsValid) {
            throw new AppError("Company CPNJ is invalid ");
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