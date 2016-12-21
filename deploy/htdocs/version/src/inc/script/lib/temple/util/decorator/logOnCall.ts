/**
 * @namespace temple.util
 * @class decorator
 */
/**
 * This is a **method decorator**.
 *
 * Replaces the original method with a method that calls `console.info` when the method is called, then calls the
 * original method, and finally logs the return value of that method. Useful for debugging.
 *
 * @method logOnCall
 * @return MethodDecorator
 */
export default function logOnCall():MethodDecorator
{
	return function(target:Object,
	                propertyKey:string,
	                descriptor:TypedPropertyDescriptor<Function>):TypedPropertyDescriptor<Function>
	{
		let originalMethod = descriptor.value;
		descriptor.value = function(...args:Array<any>)
		{
			console.info(`method ${propertyKey} called with arguments:`, ...args);
			let returnValue = originalMethod.apply(this, args);
			console.info(`method ${propertyKey} returned:`, returnValue);

			return returnValue;
		};

		return descriptor;
	}
}