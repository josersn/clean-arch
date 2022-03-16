interface Account {
    name: string,
    cnpj: string,
    description: string,
    logo: string,
    address: string,
    revenue: string,
}

class CreateAccountService {

    async execute({ name, cnpj, description, logo, address, revenue }: Account): Promise<Account> {
        return {
            name,
            cnpj,
            description,
            logo,
            address,
            revenue
        }
    }
}

export { CreateAccountService }