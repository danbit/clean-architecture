import Dimension from "./Dimension"
import Freight from "./Freight "

const addFreightItems = (freight: Freight) => {
    freight.addItem(1, new Dimension(20, 15, 10))
    freight.addItem(3, new Dimension(100, 30, 10))
    freight.addItem(40, new Dimension(200, 100, 50))
}

test('should be calculate total freight', () => {
    const freight = new Freight(1000)
    addFreightItems(freight)
    const totalFreight = freight.calculateTotalFreight()
    expect(totalFreight).toBe(439.99)
})

test('should return a minimal total freight', () => {
    const freight = new Freight(1000)
    freight.addItem(1, new Dimension(20, 15, 10))    
    const totalFreight = freight.calculateTotalFreight()
    expect(totalFreight).toBe(10)
})
