import Dimension from "./Dimension";
import FreightItem from "./FreightItem";

export default class Freight {
    static readonly DENSITY_DIVISOR = 100;
    private items!: Array<FreightItem>

    constructor(readonly distance: number) {
    }

    addItem(weight: number, dimension: Dimension) {
        if (!this.items) {
            this.items = []
        }
        this.items.push(new FreightItem(weight, dimension))
    }

    calculateTotalFreight(): number {
        return this.items.reduce((accumulator, currentValue) => {
            const { dimension } = currentValue
            const volume = dimension.calculateVolume()
            const density = dimension.calculateDensity(currentValue.wheight, volume)
            const price = this.distance * volume * (density / Freight.DENSITY_DIVISOR)
            return accumulator + price
        }, 0)
    }
}
