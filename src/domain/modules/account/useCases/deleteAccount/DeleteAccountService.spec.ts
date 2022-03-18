import { AppError } from "../../../../../presentation/infra/http/error/AppError";
import { AccountRepository } from "../../repositories/AccountRepository";
import { CreateAccountService } from "../createAccount/CreateAccountService";
import { DeleteAccountService } from "./DeleteAccountService";

let sut: DeleteAccountService;
let rut: AccountRepository;
let createAccountService: CreateAccountService;

beforeEach(() => {
    rut = new AccountRepository();
    sut = new DeleteAccountService(rut);
    createAccountService = new CreateAccountService(rut);
})

describe('Delete a company account service', () => {
    it('Should be able to delete a company account', async () => {

        const companyData = {
            name: "BanQi",
            cnpj: "04221023000500",
            description: "A digital bank in Via's group",
            logo: "https://banqi.com.br/assets/img/ui/logo-internas.svg",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        };

        const account = await createAccountService.execute(companyData);

        const deletedAccount = await sut.execute(account.id);

        expect(deletedAccount.available).toEqual(0);

    });

    it('Should not be able to delete a non exists account', async () => {
        await expect(sut.execute('MOCK_ID')).rejects.toBeInstanceOf(AppError);
    })
})