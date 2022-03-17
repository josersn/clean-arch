import { AccountRepository } from "../../repositories/AccountRepository";
import { CreateAccountService } from "../createAccount/CreateAccountService";
import { DeleteAccountService } from "../deleteAccount/DeleteAccountService";
import { ListAccountService } from "./ListAccountService";

let sut: ListAccountService;
let rut: AccountRepository;
let createAccountService: CreateAccountService;
let deleteAccount: DeleteAccountService;

beforeEach(() => {
    rut = new AccountRepository();
    sut = new ListAccountService(rut);
    createAccountService = new CreateAccountService(rut);
    deleteAccount = new DeleteAccountService(rut);

})

describe('List all company accounts service', () => {
    it('Should be able to list all company account', async () => {

        const firstCompanyData = {
            name: "vvlog",
            cnpj: "04221023000500",
            description: "A transport company in Via's group",
            logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const secondCompanyData = {
            name: "via",
            cnpj: "33041260065290",
            description: "A Company group",
            logo: "https://www.via.com.br/",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const firstAccount = await createAccountService.execute(firstCompanyData);
        const secondAccount = await createAccountService.execute(secondCompanyData);

        const accountList = await sut.execute();

        expect(accountList).toEqual([firstAccount, secondAccount]);

    })

    it('Should not be able to list a unavailable account', async () => {
        const firstCompanyData = {
            name: "vvlog",
            cnpj: "20147862000159",
            description: "A transport company in Via's group",
            logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const secondCompanyData = {
            name: "via",
            cnpj: "15358997000123",
            description: "A Company group",
            logo: "https://www.via.com.br/",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const firstAccount = await createAccountService.execute(firstCompanyData);
        const secondAccount = await createAccountService.execute(secondCompanyData);

        await deleteAccount.execute(firstAccount.id);

        const accountList = await sut.execute();

        expect(accountList).toEqual([secondAccount]);
    })
})