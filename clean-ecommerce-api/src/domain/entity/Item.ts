import Dimension from "./Dimension";

class Item {
    constructor(readonly description: string, readonly price: number, readonly dimension : Dimension) {
    }
}

export { Item }
