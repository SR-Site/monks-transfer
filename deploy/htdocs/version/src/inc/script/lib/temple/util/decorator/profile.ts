/**
 * @namespace temple.util
 * @class decorator
 */

/**
 * This is a **method decorator**.
 *
 * Profiles a function by calling performance.now before and after and comparing the results. Can optionally run the
 * function multiple times and display the total, average, longest and the slowest calls.
 *
 * **Usage:**
 * ```typescript
 * class Foo {
 *     \@profile()
 *     public startFib() {
 *         this.fib(30);
 *     }
 *
 *     \@profile(10)
 *     public startFibMore() {
 *         this.fib(30);
 *     }
 *
 *     public fib(n:number = 100):number
 *     {
 *         if(n <= 2)
 *         {
 *             return 1;
 *         }
 *         return this.fib(n - 1) + this.fib(n - 2);
 *     }
 * }
 * ```
 *
 * **Note:** remove the backslash before the @ symbol, YUIDoc won't display the example properly if there is only ``@autobind``
 *
 * @method profile
 * @param [averageOver=1] {number} Number of times the function should be executed to measure averages
 * @return MethodDecorator
 */
export default function profile(averageOver:number = 1):MethodDecorator
{
	return function(target:Object,
	                key:string,
	                descriptor:TypedPropertyDescriptor<Function>):TypedPropertyDescriptor<Function>
	{
		let originalMethod = descriptor.value;
		let className = (<any> target.constructor).name;

		descriptor.value = function(...args:Array<any>)
		{
			let total:number = 0;
			let returnValue:any;
			let slowest:number;
			let fastest:number;

			for(var i = 0; i < averageOver; i++)
			{
				let start = performance.now();
				returnValue = originalMethod.apply(this, args);
				let end = performance.now();
				let diff = end - start;

				if(fastest == void 0)
				{
					fastest = diff;
				}
				else
				{
					fastest = Math.min(diff, fastest);
				}
				if(slowest == void 0)
				{
					slowest = diff;
				}
				else
				{
					slowest = Math.max(diff, slowest);
				}

				total += end - start;
			}

			if(averageOver > 1)
			{
				// only display the additional info when we have run the function more than once
				console.info(`${className}#${key}: profiler ran ${averageOver} times.`);
				console.info(`${className}#${key}: Total time: ${total}ms, average: ${total / averageOver}ms`);
				console.info(`${className}#${key}: Fastest: ${fastest}ms, slowest: ${slowest}ms`);
			}
			else
			{
				// display basic info when function is run only once
				console.info(`${className}#${key}: took ${total}ms to execute`)
			}

			return returnValue;
		};

		return descriptor;
	}
}