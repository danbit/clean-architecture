class Customer {
    private _document!: string

    public get document() {
        return this._document
    }

    public set document(document: string){
        this._document = document
    }
}

export { Customer }
