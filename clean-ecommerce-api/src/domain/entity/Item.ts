import Dimension from "./Dimension";

export default class Item {
    constructor(readonly id: number, readonly description: string, readonly price: number, readonly weight: number, readonly dimension?: Dimension) {
    }

    calculateVolume(): number {
        if(!this.dimension) {
            return 0
        }
        const { height, length, width } = this.dimension
        const volume = this.centimeterToMetre(height) * this.centimeterToMetre(length) * this.centimeterToMetre(width)
        return parseFloat(volume.toFixed(3))
    }

    calculateDensity(weight: number, volume: number): number {
        return Math.trunc(weight / volume)
    }

    centimeterToMetre(value: number): number {
        return value / 100
    }
}
