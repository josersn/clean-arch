import { uuid } from "../../../helpers/uuid";

class Account {
    id: string;

    name: string;

    cnpj: string;

    description: string;

    logo: string;

    address: string;

    revenue: number;

    available?: number;

    created_at?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.available = 1;
        }
    }

}

export { Account }