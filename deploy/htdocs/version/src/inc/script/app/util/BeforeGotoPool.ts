import * as Gaia from "lib/gaia/api/Gaia";
import EventDispatcher from "../../lib/temple/event/EventDispatcher";
import Promise = require("bluebird");

/**
 * @class BeforeGotoPool
 * @description You can only hijack the before goto once, because if you release it you will release
 * all other hijacks linked to it. Sometimes you do not want this therefore I created the beforeGotoPool where you
 * can add more listeners to the pool and it will wait for all of them to be release before releasing the global beforeGoto.
 */
class BeforeGotoPool extends EventDispatcher
{
	private static UNIQUE_ID: number = 0;

	private _releaseBeforeGoto: (removeHijack?: boolean) => void;
	private _pool: {[id: string]: IBeforeGotoPoolItem} = {};
	private _count: number = 0;

	constructor()
	{
		super();

		this._releaseBeforeGoto = Gaia.api.beforeGoto(this.handleBeforeGoto.bind(this), true);
	}

	/**
	 * @public
	 * @method add
	 * @description Add a listener to the pool of before goto methods
	 * @param listener
	 * @param onlyOnce
	 */
	public add(listener: () => void, onlyOnce: boolean = false): void
	{
		this._pool[(BeforeGotoPool.UNIQUE_ID++).toString()] = {
			listener: listener,
			onlyOnce: onlyOnce
		};
	}

	/**
	 * @private
	 * @method handleBeforeGoto
	 */
	private handleBeforeGoto(): void
	{
		// console.info('[BeforeGotoPool] Handle before goto');

		this._count = Object.keys(this._pool).length;

		// If no items are in the pool release it right away
		if(this._count === 0)
		{
			this._releaseBeforeGoto();
		}

		Object.keys(this._pool).forEach((id: string) =>
		{
			const item = this._pool[id];

			// Trigger the listener
			item.listener((removeHijack?: boolean) => this.handleReleaseBeforeGoto(id, removeHijack));
		});
	}

	/**
	 * @private
	 * @method handleReleaseBeforeGoto
	 * @param id
	 * @param removeHijack
	 */
	private handleReleaseBeforeGoto(id: string, removeHijack: boolean = false): void
	{
		--this._count;

		// console.info('[BeforeGotoPool] HandleReleaseBeforeGoto', id, removeHijack, this._count);

		// Check if it should only be triggered once
		if(this._pool[id].onlyOnce || removeHijack)
		{
			delete this._pool[id];
		}

		// No more items left, so release it
		if(this._count === 0)
		{
			console.info('[BeforeGotoPool] No more items left, release the entire beforeGoto');

			this._releaseBeforeGoto();
		}
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		if(this._releaseBeforeGoto)
		{
			this._releaseBeforeGoto(true);
			this._releaseBeforeGoto = null;
		}

		this._pool = null;
		this._count = null;

		super.destruct();
	}
}

interface IBeforeGotoPoolItem
{
	listener: (releaseBeforeGoto: () => void) => void,
	onlyOnce: boolean
}

export default BeforeGotoPool;