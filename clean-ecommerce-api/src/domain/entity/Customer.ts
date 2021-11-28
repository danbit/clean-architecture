class Customer {
    private _document!: string

    constructor(document: string) {
        this._document = document
    }

    public get document() {
        return this._document
    }

    public set document(document: string) {
        this._document = document
    }
}

export { Customer }
