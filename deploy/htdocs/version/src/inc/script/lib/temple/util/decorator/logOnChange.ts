/**
 * @namespace temple.util
 * @class decorator
 */
/**
 * This is a **property decorator**.
 *
 * Logs when a property is accessed or updated.
 *
 * @method logOnChange
 * @param [logSet=true] {boolean} when false, does not log when the property is updated
 * @param [logGet=true] {boolean} when false, does not log when the property is retrieved
 * @param [logTrace=false] {boolean} when true, fires a console.trace when property is get or set
 * @return PropertyDecorator
 */
export default function logOnChange(logSet:boolean = true,
                                    logGet:boolean = true,
                                    logTrace:boolean = false):PropertyDecorator
{
	return function(target:Object,
	                propertyKey:string):void
	{
		// store the previous value of the property, so we can log what it used to be, and what it's gonna be
		let val:any;

		if(this != void 0)
		{
			val = this[propertyKey];
		}

		// Prototype values in JavaScript-emitted-TypeScript are set in the constructor, instead of directly on the
		// prototype. This means that when this decorator called, the value is always undefined. We have to allow
		// TypeScript to set the value once.

		// We do this so console.log is not excessively called when constructing the class instance

		Object.defineProperty(target, propertyKey, {
			configurable: true,
			set: function(newVal)
			{
				// to delete a setter, delete must be called on the property
				delete this[propertyKey];

				// Create new property with getter and setter
				Object.defineProperty(target, propertyKey, {
					get: function()
					{
						if(logGet == true)
						{
							console.info(`Get: ${propertyKey} = ${val}`);

							if(logTrace == true)
							{
								console.trace();
							}
						}

						return val;
					},
					set: function(newVal:any)
					{
						if(logSet == true)
						{
							console.info(`Set: ${propertyKey} = ${val} => ${newVal}`);

							if(logTrace == true)
							{
								console.trace();
							}
						}

						// update cached old value to new value
						val = newVal;
					}
				});
			}
		});


	}
}