import { AccountRepository } from "../../repositories/AccountRepository";
import { CreateAccountService } from "../createAccount/CreateAccountService";
import { DeleteAccountService } from "../deleteAccount/DeleteAccountService";
import { GetAccountService } from "../getAccount/GetAccountService";
import { EditAccountService } from "./EditAccountService";

let sut: EditAccountService;
let rut: AccountRepository;
let accountService: CreateAccountService;
let getAccountService: GetAccountService;
let deleteAccountService: DeleteAccountService;
let createAccountService: CreateAccountService;

beforeEach(() => {
    rut = new AccountRepository();
    sut = new EditAccountService(rut);
    accountService = new CreateAccountService(rut);
    getAccountService = new GetAccountService(rut);
    createAccountService = new CreateAccountService(rut);
    deleteAccountService = new DeleteAccountService(rut);
})

describe('Edit Account company service ', () => {
    it('Should be to edit a company account', async () => {

        const companyData = {
            name: "airFox",
            cnpj: "04221023000500",
            description: "A digital bank in Via's group",
            logo: "https://mms.businesswire.com/media/20200522005034/en/793058/23/Airfox_-_Light_Blue_Logo_%282%29.jpg",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const newCompanyData = {
            name: "BanQi",
            cnpj: "04221023000500",
            description: "A digital bank in Via's group",
            logo: "https://banqi.com.br/assets/img/ui/logo-internas.svg",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const account = await accountService.execute(companyData);
        const accountEdited = await sut.execute(account.id, newCompanyData);
        const accountFound = await getAccountService.execute(accountEdited.id);

        expect(accountFound?.name).toBe("BanQi");
        expect(accountFound).toEqual(newCompanyData);

    })

    it('Should not be able to edit a non exist account', async () => {

        const newCompanyData = {
            name: "BanQi",
            cnpj: "04221023000500",
            description: "A digital bank in Via's group",
            logo: "https://banqi.com.br/assets/img/ui/logo-internas.svg",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        await expect(sut.execute('MOCK_ID', newCompanyData)).rejects.toThrowError("Account not exists");
    })

    it('Should not be able to edit a unavailable account', async () => {

        const newCompanyData = {
            name: "BanQi",
            cnpj: "04221023000500",
            description: "A digital bank in Via's group",
            logo: "https://banqi.com.br/assets/img/ui/logo-internas.svg",
            address: "Av. Conde Francisco Matarazzo",
            revenue: 100000
        }

        const account = await createAccountService.execute(newCompanyData);
        await deleteAccountService.execute(account.id);

        await expect(sut.execute(account.id, newCompanyData)).rejects.toThrowError("Account can not edit");
    })
})