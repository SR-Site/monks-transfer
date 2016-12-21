/**
 * @namespace temple.util
 * @class decorator
 */

/**
 * This is a **property decorator**.
 *
 * Makes the property readonly
 *
 * @method readonly
 * @param [readonly=true] {boolean}
 * @returns PropertyDecorator
 */
export default function readonly(readonly:boolean = true):PropertyDecorator
{
	return function(target:Object,
	                propertyKey:string):void
	{
		if(target[propertyKey] == void 0)
		{
			// Prototype values in JavaScript-emitted-TypeScript are set in the constructor, instead of directly on the
			// prototype. This means that when this decorator called, the value is always undefined. We have to allow
			// TypeScript to set the value once, and then we can mark it as readonly.

			Object.defineProperty(target, propertyKey, {
				configurable: true,
				set: function(newVal)
				{
					// to delete a setter, delete must be called on the property
					delete this[propertyKey];

					// update the property with a setter function that does nothing
					Object.defineProperty(this, propertyKey, {
						set: () => void 0,
						get: () => newVal,
						configurable: true
					});
				}
			});
		}
	}
}