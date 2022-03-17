class Account {
    id?: string;

    name!: string;

    cnpj!: string;

    description!: string;

    logo!: string;

    address!: string;

    revenue!: number;

    created_at?: Date;

    constructor() {
        if (!this.id) {

            const head = Date.now().toString(36);
            const tail = Math.random().toString(36).substring(2);

            this.id = head + tail;
        }
    }

}

export { Account }