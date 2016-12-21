/**
 * @namespace temple.util
 * @class decorator
 */

/**
 * This is a **method decorator**.
 *
 * Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed
 * an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to
 * the original function. The default hashFunction just uses the first argument to the memoized function as the key. The
 * cache of memoized values is available as the cache property on the returned function.
 *
 * **Usage:**
 * ```typescript
 * class Foo {
 *     \@memoize()
 *     public fib(n:number = 100):number
 *     {
 *         if(n <= 2)
 *         {
 *             return 1;
 *         }
 *         return this.fib(n - 1) + this.fib(n - 2);
 *     }
 *
 *     // with custom hashing function
 *     \@memoize((obj:IMyObject) => JSON.stringify(obj))
 *     public someExpensiveComputation(object:IMyObject):number
 *     {
 *          // ...
 *     }
 * }
 * ```
 *
 * **Note:** remove the backslash before the @ symbol, YUIDoc won't display the example properly if there is only ``@autobind``
 *
 * @method memoize
 * @param [hashMethod=Function] {Function} the hashing function that should return the hash used in the lookup table, defaults to hashingMethods.firstArgumentOnly
 * @return MethodDecorator
 */
export default function memoize(hashMethod:(...args:Array<any>) => any = hashingMethods.firstArgumentOnly):MethodDecorator
{
	return function(target:Object,
	                key:string,
	                descriptor:TypedPropertyDescriptor<Function>):TypedPropertyDescriptor<Function>
	{
		let originalMethod = descriptor.value;
		let memoizationCache = {};

		descriptor.value = function(...args:Array<any>)
		{
			let key = hashMethod(...args);
			let value = memoizationCache[key];

			if(value == void 0)
			{
				// run the function if the value has not been memoized
				value = originalMethod.apply(this, args);
				memoizationCache[key] = value;
			}

			return value;
		};

		descriptor.value['cache'] = memoizationCache;

		return descriptor;
	}
}

/**
 * Common hashing methods to use in memoize decorator
 *
 * @class hashingMethods
 */
export var hashingMethods = {
	/**
	 * Provides a very basic hash method that simply uses the first argument as the cache key.
	 *
	 * @method firstArgumentOnly
	 * @static
	 * @param args {any[]}
	 * @returns {any}
	 */
	firstArgumentOnly: function (...args:Array<any>):any {
		return args[0];
	},

	/**
	 * Provides a hashing method that combines all the arguments and joins them into a string after stringifying with JSON.stringify
	 *
	 * @method mixedArgumentTypes
	 * @static
	 * @param args {any[]}
	 * @returns {string}
	 */
	mixedArgumentTypes: function(...args:Array<any>):string
	{
		let i = args.length;
		let hash = '';

		while(i--)
		{
			let currentArg = args[i];
			hash += (currentArg === Object(currentArg))
				? JSON.stringify(currentArg)
				: currentArg;
		}

		return hash;
	}
};