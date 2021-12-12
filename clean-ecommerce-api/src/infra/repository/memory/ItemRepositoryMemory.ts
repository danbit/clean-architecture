import Dimension from "../../../domain/entity/Dimension";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
	items: Item[];

	constructor () {
		this.items = [
			new Item(1, 'Item A', 15.99, 1),
			new Item(2, 'Item B', 5.59, 3),
			new Item(3, 'Item C', 139.99, 40),
			new Item(4, 'Item D', 15.99, 1, new Dimension(20, 15, 10)),
			new Item(5, 'Item E', 5.59, 3, new Dimension(100, 30, 10)),
			new Item(6, 'Item F', 139.99, 40, new Dimension(200, 100, 50)),	
		]
	}

	findById(idItem: number): Promise<Item | undefined> {
		return Promise.resolve(this.items.find(item => item.id === idItem));
	}
}
