import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

export default class DefaultFreightCalculator implements FreightCalculator {
    static readonly DEFAULT_DISTANCE_KM = 1000
    static readonly DENSITY_DIVISOR = 100
    static readonly FREIGHT_MINIMAL = 10

    calculate(item: Item): number {
        if (!item.dimension) return 0;

        const volume = item.calculateVolume()
        const density = item.calculateDensity(item.weight, volume)

        const freight = DefaultFreightCalculator.DEFAULT_DISTANCE_KM * volume * (density / DefaultFreightCalculator.DENSITY_DIVISOR)
        return Math.max(DefaultFreightCalculator.FREIGHT_MINIMAL, freight);
    }
}
