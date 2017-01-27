import EventDispatcher from "../../lib/temple/event/EventDispatcher";
import Promise = require("bluebird");

/**
 * @class Loader
 * @description This class creates a simple loader that can be shown when a-sync actions take place.
 * It returns a promise so you can chain them in your loading flow.
 */
class Loader extends EventDispatcher
{
	/**
	 * @property ELEMENT_CLASS
	 * @type {string}
	 */
	private static ELEMENT_CLASS:string = 'js-loader';
	/**
	 * @property _element
	 * @type {Element}
	 */
	private _element:Element;
	/**
	 * @property _transitionOutPromise
	 * @type {Function}
	 */
	private _transitionOutPromise:Function;
	/**
	 * @property
	 * @type {Function}
	 */
	private _transitionInPromise:Function;

	constructor(private _wrapper:HTMLElement, className:string = '')
	{
		super();

		this._element = this._wrapper.querySelector('.' + Loader.ELEMENT_CLASS);

		if(!this._element)
		{
			this._element = document.createElement('div');
			this._element.classList.add(Loader.ELEMENT_CLASS);

			if(className.length)
			{
				this._element.classList.add(className);
			}

			this._wrapper.appendChild(this._element);
		}
	}

	/**
	 * @public
	 * @method show
	 * @description The show methods returns a promise to allow chaining it in a flow
	 * @returns promise<any>
	 */
	public show():Promise<any>
	{
		this._transitionInPromise = null;

		TweenLite.to(this._element, .4, {
			opacity: 1, display: 'block', onComplete: () =>
			{
				this._transitionInPromise();
			}
		});

		return new Promise((resolve:Function)=>
		{
			this._transitionInPromise = resolve;
		});
	}

	/**
	 * @public
	 * @method hide
	 * @description The hide method returns a promise to allow chaining it in a flow
	 * @returns Promise<any>
	 */
	public hide():Promise<any>
	{
		this._transitionOutPromise = null;

		TweenLite.to(this._element, .4, {
			opacity: 0, display: 'none', onComplete: () =>
			{
				this._transitionOutPromise();
			}
		});

		return new Promise((resolve:Function)=>
		{
			this._transitionOutPromise = resolve;
		});
	}

	/**
	 * @public
	 * @method setHeight
	 */
	public setHeight(height:number):void
	{
		TweenLite.set(this._element, {height: height});
	}

	/**
	 * @public
	 * @method resetHeight
	 */
	public resetHeight():void
	{
		TweenLite.set(this._element, {clearProps: 'height'});
	}


	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		super.destruct();
	}
}

export default Loader;
