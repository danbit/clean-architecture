class CustomerNotFound extends Error {
    constructor() {
        super(`Customer not found`);
        this.name = 'CustomerNotFound'
    }
}

export { CustomerNotFound }
