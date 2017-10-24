import Disposable from 'seng-disposable/lib/Disposable';
import sha1 from 'sha1';
import bows from 'bows';

interface ICacheObject {
	[id: string]: string | ICacheObject;
}

class CacheManager extends Disposable {
	/**
	 * @description Object containing all the cached assets
	 * @type {{}}
	 * @private
	 */
	private _cache: ICacheObject = {};
	/**
	 * @description Logger for displaying messages
	 */
	private _log: bows = new bows('CacheManager');

	/**
	 * @public
	 * @method add
	 * @param {string} id
	 * @param asset
	 * @param {string} nameSpace
	 */
	public add(id: string, asset: any, nameSpace?: string): void {
		const hashedId = sha1(id);
		if (nameSpace) {
			this.getNameSpacedObject(nameSpace)[hashedId] = asset;
		} else {
			this._cache[hashedId] = asset;
		}
	}

	/**
	 * @public
	 * @method get
	 * @param {string} id
	 * @param {string} nameSpace
	 * @returns {any}
	 */
	public get(id: string, nameSpace?: string): any {
		const hashedId = sha1(id);
		if (nameSpace) {
			return this.getNameSpacedObject(nameSpace)[hashedId];
		} else {
			return this._cache[hashedId];
		}
	}

	/**
	 * @public
	 * @method remove
	 * @param {string} id
	 */
	public remove(idOrNameSpace: string): void {
		const hashedId = sha1(idOrNameSpace);

		if (!this._cache[hashedId]) {
			this._log(`Unable to remove: ${idOrNameSpace}`);
		} else {
			delete this._cache[hashedId];
			this._log(`Removed ${idOrNameSpace} from cache`);
		}
	}

	/**
	 * @private
	 * @method getNamespace
	 * @param {string} namespace
	 * @returns {ICacheObject}
	 */
	private getNameSpacedObject(nameSpace: string): ICacheObject {
		const hashedNameSpace = sha1(nameSpace);
		if (!this._cache[hashedNameSpace]) {
			this._cache[hashedNameSpace] = {};
		}

		return <ICacheObject>this._cache[hashedNameSpace];
	}

	/**
	 * @public
	 * @method dispose
	 */
	public dispose(): void {
		this._cache = null;
		super.dispose();
	}
}

// Create an instance
const cacheManager = new CacheManager();

// TODO: Remove this!
window['cache'] = cacheManager;

// Export the instances
export default cacheManager;
