import { AccountValidator } from "../../helpers/AccountValidators";
import { AccountRepository } from "../../repositories/AccountRepository";
import { CreateAccountService } from "./CreateAccountService";

let rut: AccountRepository;
let sut: CreateAccountService;
let accountValidator: AccountValidator;

describe('Create a company account use case.', () => {

  beforeEach(() => {
    accountValidator = new AccountValidator();
    rut = new AccountRepository();       // repository under test
    sut = new CreateAccountService(rut, accountValidator); // service under test
  })

  it('Should be able to a new create account.', async () => {

    const companyData = {
      name: "vvlog",
      cnpj: "04221023000500",
      description: "A transport company in Via's group",
      logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
      address: "Av. Conde Francisco Matarazzo",
      revenue: 100000
    }
    const response = await sut.execute(companyData);

    expect(response).toBeTruthy();
  })



  it("Should not be able to create a company with exists cnpj", async () => {

    const companyData = {
      name: "vvlog",
      cnpj: "04221023000500",
      description: "A transport company in Via's group",
      logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
      address: "Av. Conde Francisco Matarazzo",
      revenue: 100000
    }

    await sut.execute(companyData);
    await expect(sut.execute({
      name: "vvlog",
      cnpj: "04221023000500",
      description: "A transport company in Via's group",
      logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
      address: "Av. Conde Francisco Matarazzo",
      revenue: 100000
    })).rejects.toThrowError(Error("User Already Exists"));

  });

  it("Should not be able to create a company with invalid CPNJ", async () => {

    const companyData = {
      name: "vvlog",
      cnpj: "01011010101510",
      description: "A transport company in Via's group",
      logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
      address: "Av. Conde Francisco Matarazzo",
      revenue: 100000
    }

    await expect(sut.execute(companyData)).rejects.toThrowError("Company CPNJ is invalid")

  })

})  