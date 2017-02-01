import IIndexable from "../../../lib/temple/core/IIndexable";
import Destructible from "../../../lib/temple/core/Destructible";

abstract class AbstractDataModel<T extends IIndexable> extends Destructible
{
	protected data: Array<T> = [];
	protected idMap: {[id: string]: T} = {};

	/**
	 * Method to add a item to the data model
	 *
	 * @public
	 * @method addItem
	 * @param item
	 */
	public addItem(item: T): void
	{
		// Check for existing id otherwise add a index
		item.id = item.id == void 0 ? this.data.length.toString() : item.id;

		if(!this.hasItem(item.id))
		{
			this.data.push(item);

			this.idMap[item.id] = item;
		}
		else
		{
			throw new Error('Item with the following id: ' + item.id + ' already exists')
		}
	}

	/**
	 * Method that replaces the existing record with a new one
	 *
	 * @public
	 * @method updateItem
	 */
	public updateItem(item: T): void
	{
		const old = this.getItemById(item.id);

		if(old)
		{
			this.data[this.data.indexOf(item)] = item;
		}
	}

	/**
	 * Method to add an Array of items to the data model.
	 *
	 * @public
	 * @method addItems
	 * @param items
	 */
	public addItems(items: Array<T>): void
	{
		for(let i = 0; i < items.length; i++)
		{
			this.addItem(items[i]);
		}
	}

	/**
	 * @public
	 * @method removeItems
	 */
	public removeItems(): void
	{
		this.data = [];
		this.idMap = {};
	}

	/**
	 * Method to retrieve all items from the data model
	 *
	 * @public
	 * @method getAllItems
	 * @returns {Array<T>}
	 */
	public getAllItems(): Array<T>
	{
		return this.data.concat([]);
	}

	/**
	 * Method to retrieve a set of the items in the model
	 *
	 * @public
	 * @method getItems
	 * @param offset
	 * @param limit
	 * @returns {Array<T>}
	 */
	public getItems(offset: number = 0, limit: number = 5): Array<T>
	{
		return this.data.slice(offset, limit);
	}

	/**
	 * Method to retrieve a specific item by it's id
	 *
	 * @public
	 * @method getItemById
	 * @param id
	 * @returns {any}
	 */
	public getItemById(id: string): T
	{
		if(this.hasItem(id))
		{
			return this.idMap[id];
		}

		throw new Error('No item found with the following id: ' + id)
	}

	/**
	 * Method that returns an array items based on id's
	 *
	 * @public
	 * @method getItemsByIds
	 * @param ids
	 */
	public getItemsByIds(ids: Array<string>): Array<T>
	{
		return ids.map((id) => this.idMap[id]);
	}

	/**
	 * @public
	 * @method hasItemn
	 * @param id
	 * @returns {boolean}
	 */
	public hasItem(id:string): boolean
	{
		return id in this.idMap;
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		this.data = null;
		this.idMap = null;

		super.destruct();
	}
}

export default AbstractDataModel;
