import IIndexable from "../../../lib/temple/core/IIndexable";
import Destructible from "../../../lib/temple/core/Destructible";

class AbstractDataModel<T extends IIndexable> extends Destructible
{
	protected _data:Array<T> = [];
	protected _idMap:{[index:string]:number} = {};

	/**
	 * Method to add a item to the data model
	 *
	 * @public
	 * @method addItem
	 * @param item
	 */
	public addItem(item:T):void
	{
		// Check for existing id otherwise add a index
		item.id = item.id == void 0 ? this._data.length.toString() : item.id;

		if(!this.getItemByID(item.id))
		{
			this._data.push(item);

			// Store the location
			this._idMap[item.id] = this._data.length - 1;
		}
	}

	/**
	 * Method that replaces the existing record with a new one
	 *
	 * @public
	 * @method updateItem
	 */
	public updateItem(item:T):void
	{
		if(this.getItemByID(item.id))
		{
			this._data[this._data.indexOf(item)] = item;
		}
	}

	/**
	 * Method to add an Array of items to the data model.
	 *
	 * @public
	 * @method addItems
	 * @param items
	 */
	public addItems(items:Array<T>):void
	{
		for(var i = 0; i < items.length; i++)
		{
			this.addItem(items[i]);
		}
	}

	/**
	 * @public
	 * @method removeItems
	 */
	public removeItems():void
	{
		this._data = [];
		this._idMap = {};
	}

	/**
	 * Method to retrieve all items from the data model
	 *
	 * @public
	 * @method getAllItems
	 * @returns {Array<T>}
	 */
	public getAllItems():Array<T>
	{
		return this._data;
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
	public getItems(offset:number = 0, limit:number = 5):Array<T>
	{
		var items:Array<T> = [];

		for(var i = offset; i < limit; i++)
		{
			var item = this._data[i];

			if(item) items.push(item);
		}

		return items
	}

	/**
	 * Method to retrieve a specific item by it's id
	 *
	 * @public
	 * @method getItemById
	 * @param id
	 * @returns {any}
	 */
	public getItemByID(id:string):T
	{
		return this._data[this._idMap[id]];
	}

	/**
	 * Method that returns an array items based on id's
	 *
	 * @public
	 * @method getItemsByIDs
	 * @param ids
	 */
	public getItemsByIDs(ids:Array<string>):Array<T>
	{
		return ids.map((id)=> this._data[this._idMap[id]]);
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		this._data = null;
		this._idMap = null;

		super.destruct();
	}
}

export default AbstractDataModel;
