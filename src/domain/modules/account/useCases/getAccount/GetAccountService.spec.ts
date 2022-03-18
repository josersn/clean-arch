import { AppError } from "../../../../../presentation/infra/http/error/AppError";
import { AccountRepository } from "../../repositories/AccountRepository";
import { CreateAccountService } from "../createAccount/CreateAccountService";
import { DeleteAccountService } from "../deleteAccount/DeleteAccountService";
import { GetAccountService } from "./GetAccountService";


let sut: GetAccountService;
let rut: AccountRepository;
let createAccountService: CreateAccountService;
let deleteAccountService: DeleteAccountService;

beforeEach(() => {

    rut = new AccountRepository();
    sut = new GetAccountService(rut);
    createAccountService = new CreateAccountService(rut);
    deleteAccountService = new DeleteAccountService(rut);
})


describe('List a Company Account Service', () => {
    it('Should able to show a company account', async () => {

        const companyData = {
            name: "vvlog",
            cnpj: "04221023000500",
            description: "A transport company in Via's group",
            logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const account = await createAccountService.execute(companyData);

        const accountFound = await sut.execute(account.id);


        expect(accountFound).toBeTruthy();
        expect(accountFound?.cnpj).toBe(companyData.cnpj);

    })

    it("should not be able to get a unavailable account", async () => {
        const companyData = {
            name: "vvlog",
            cnpj: "04221023000500",
            description: "A transport company in Via's group",
            logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const account = await createAccountService.execute(companyData);
        await deleteAccountService.execute(account.id);
        await expect(sut.execute(account.id)).rejects.toBeInstanceOf(AppError);

    })
})