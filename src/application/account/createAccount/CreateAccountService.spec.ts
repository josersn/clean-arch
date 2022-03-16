import { CreateAccountService } from "./CreateAccountService";

describe('Create a company account use case.', () => {
  it('Should be able to a new create account.', async () => {

    const companyData = {
      name: "vvlog",
      cnpj: "04221023000500",
      description: "A transport company in Via's group",
      logo: "http://www.setcesp.org.br/upload/ckeditor/files/SetcespOnline/Associados/VVLog_-_viavarejo.com.brvvlog.png",
      address: "Av. Conde Francisco Matarazzo",
      revenue: "100000"
    }

    const sut = new CreateAccountService();
    const response = await sut.execute(companyData);

    expect(response).toBeTruthy();
  })
})