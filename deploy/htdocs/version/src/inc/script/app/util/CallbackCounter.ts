import Destructible from "../../lib/temple/core/Destructible";
import Promise = require("bluebird");

/**
 *    ## CallbackCounter
 *    Class that checks for components to be loaded.
 *
 *    There are two ways of using this class:
 *    - Create an instance of the class and pass the callback in the constructor
 *    - Create an instance of the class and do not pass the callback, this will automatically create a promise that will be resolved when all the components are loaded
 *
 *    #### Typescript example 1:
 *    ```typescript
 *     this.callbackCounter = new CallbackCounter(()=>
 *     {
 *         console.log('All components loaded!');
 *     ));
 *     ```
 *
 *     #### Typescript example 2:
 *     ```typescript
 *     this.callbackCounter = new CallbackCounter();
 *     this.callbackCounter.promise.then(()=>
 *     {
 *         console.log('All components loaded!');
 *     });
 *     ```
 *
 *     When loading the component you will have to call the get method on the callbackCounter instance, here you can
 *     also pass another callback method that will be called when the component is actually loaded. This way you can
 *     still get the reference to the component's controller.
 *
 *     #### HTML Example
 *     ```html
 *     <!-- ko component: {
 *         name: 'component-name',
 *         onReady: controller.callbackCounter.get(controller.handleComponentReady)
 *     } --><!-- /ko -->
 *     ```
 *
 * @class CallbackCounter
 * @extends Destructible
 * @constructor
 * @param {Function} callback A callback method to call when all components are loaded, if none is provided a Promise will be created.
 * @returns {Object} The CallbackCounter instance.
 */
class CallbackCounter extends Destructible
{
	/**
	 * @property _promise
	 * @type {Promise<any>}
	 * @description The promise that will be resolved when no callback is provided
	 * @private
	 */
	private _promise: Promise<any>;
	/**
	 * @property _count
	 * @type {number}
	 * @description The amount of components on the page
	 * @default 0
	 * @private
	 */
	private _count: number = 0;
	/**
	 * @private
	 * @property _callback
	 * @type {Function}
	 * @description The callback method that's called after all components are loaded
	 */
	private _callback: Function;

	constructor(callback?: Function)
	{
		super();

		// Check if a callback method was provided
		if(callback)
		{
			// Use the callback method if it's provided
			this._callback = callback;
		}
		else
		{
			// If no callback method was provided use a promise instead
			this._promise = new Promise((resolve)=>
			{
				this._callback = resolve;
			});
		}
	}

	/**
	 * @public
	 * @method get
	 * @param {Function} onReady The function that will be called when the component is ready.
	 * @returns {Function} A new function that will be called by the component's onReady method it will trigger the original onReady method.
	 */
	public get(onReady?: Function): Function
	{
		this._count++;

		// The method called by the loaded component, it returns the reference to the controller
		return (componentController: any): void =>
		{
			if(onReady)
			{
				// Call the onReady method with the reference to the controller
				onReady(componentController);
			}

			// Check if the last component was loaded
			if(--this._count == 0)
			{
				// If the end is reached, fire the callback
				this._callback();
			}
		}
	}

	/**
	 * @public
	 * @method count
	 * @returns {number} The amount of components in the callback counter
	 */
	public get count(): number
	{
		return this._count;
	}

	/**
	 * @public
	 * @method resolve
	 * @description Manually resolve the callback if there are no components to count!
	 */
	public resolve(): void
	{
		if(!this._promise.isResolved())
		{
			this._callback();
		}
	}

	/**
	 * @public
	 * @method promise
	 * @returns {Promise} The promise that will be resolved when the components are loaded
	 */
	public get promise(): Promise<any>
	{
		if(!this._promise)
		{
			throw new Error('[CallbackCounter] The instance was created with a callback method, so the promise is not available.');
		}

		return this._promise;
	}

	/**
	 * @public
	 * @method destruct
	 * @returns void
	 */
	public destruct(): void
	{
		this._promise = null;
		this._callback = null;
		this._count = null;

		super.destruct();
	}
}

export default CallbackCounter;
