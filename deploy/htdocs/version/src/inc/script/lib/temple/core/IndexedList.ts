import Destructible from "./Destructible";
import IIndexable from "./IIndexable";

/**
 * The index list combines an Array and a Hashmap and makes quick look up of items by their id possible.
 *
 * @module Temple
 * @namespace temple.core
 * @class IndexedList

 */
class IndexedList<T extends IIndexable> extends Destructible
{
	private _list:Array<T> = [];
	private _hash:{[id:string]:T} = {};

	/**
	 * Create a new IndexedList
	 *
	 * @class IndexedList
	 * @constructor
	 * @param {Array<T>} list an optional Array of items that must be indexed
	 */
	constructor(list?:Array<T>)
	{
		super();

		if(list !== void 0)
		{
			this.addList(list);
		}
	}

	/**
	 * Checks if an item with a specific id is registered in this IndexedList
	 *
	 * @method has
	 * @param {string} id
	 * @returns {boolean}
	 */
	public has(id:string):boolean
	{
		return id in this._hash;
	}

	/**
	 * Returns the item with the specific id.
	 *
	 * This method will throw an error if there is no item with the specified id found.
	 *
	 * @method get
	 * @param {string} id
	 * @returns {T}
	 */
	public get(id:string):T
	{
		if(this.has(id))
		{
			return this._hash[id];
		}
		throw new Error("No item found with id '" + id + "'");
	}

	/**
	 * Returns a new Array with all the items in this IndexedList
	 *
	 * @method getAll
	 * @returns {Array<T>}
	 */
	public getAll():Array<T>
	{
		return this._list.slice();
	}

	/**
	 * Add a single item to the IndexedList
	 *
	 * @method add
	 * @param data
	 */
	public add(data:T):void
	{
		if(data.id === void 0)
		{
			throw new Error("Id is undefined");
		}

		const id:string = data.id;

		if(id in this._hash)
		{
			throw new Error("Data with id '" + id + "' already exists");
		}
		this._hash[id] = data;
		this._list.push(data);
	}

	/**
	 * Add an Array of items to the IndexedList
	 *
	 * @method addList
	 * @param list
	 */
	public addList(list:Array<T>):void
	{
		list.forEach(this.add.bind(this));
	}

	/**
	 * Removes a specific item from the IndexedList.
	 *
	 * This method will throw an error if the item is not in the IndexedList
	 *
	 * @method remove
	 * @param {T} data
	 */
	public delete(data:T):void
	{
		if(this._hash[data.id] && this._hash[data.id] == data)
		{
			delete this._hash[data.id];
			this._list.splice(this._list.indexOf(data), 1);
		}
		else
		{
			throw new Error("Data is not in the list");
		}
	}

	/**
	 * Calls callback once for each item present in the IndexedList object, in insertion order.
	 * If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.
	 *
	 * @method forEach
	 * @param callback
	 * @param thisArg
	 */
	public forEach(callback:(value:T, index?:number, array?:Array<T>) => void, thisArg?: any):void
	{
		this._list.forEach(callback, thisArg);
	}

	/**
	 * Removes all items in the IndexedList
	 *
	 * @method clear
	 */
	public clear():void
	{
		if(this._hash)
		{
			for(let id in this._hash)
			{
				delete this._hash[id];
			}
		}
		if(this._list)
		{
			this._list.length = 0;
		}
	}

	/**
	 * Destructs the IndexedList
	 *
	 * @method destruct
	 */
	public destruct():void
	{
		this.clear();
		this._hash = null;
		this._list = null;

		super.destruct();
	}
}

export default IndexedList;