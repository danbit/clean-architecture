class OrderItem {
    private _description!: string
    private _price!: number
    private _quantity!: number

    constructor(description: string, price: number, quantity: number){
        this._description = description
        this._price = price
        this._quantity = quantity
    }

    public get description(): string {
        return this._description
    }

    public set description(description: string) {
        this._description = description;
    }

    public get price(): number {
        return this._price
    }

    public set price(price: number) {
        this._price = price;
    }

    public get quantity(): number {
        return this._quantity
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
}

export { OrderItem }
