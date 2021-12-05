export default class Dimension {
    constructor(readonly height: number, readonly width: number, readonly length: number) {
    }

    calculateVolume(): number {
        const volume = this.centimeterToMetre(this.height) * this.centimeterToMetre(this.length) * this.centimeterToMetre(this.width)
        return parseFloat(volume.toFixed(3))
    }

    calculateDensity(weight: number, volume: number): number {
        return Math.trunc(weight / volume)
    }

    centimeterToMetre(value: number): number {
        return value / 100
    }
}