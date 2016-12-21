/**
 * @namespace temple.util
 * @class decorator
 */
/**
 * This is a **method decorator**.
 *
 * Returns a descriptor removing the value and returning a getter. The getter will bind
 * the function to the class scope and memoize the result against a symbol on the instance.
 *
 * **Usage:**
 *
 * ```typescript
 * class Foo {
 *     myString = 'Hello world!';
 *     constructor() {
 *         document.body.addEventListener('click', this.onButtonClick); // no need for .bind!
 *     }
 *     \@autobind()
 *     public onButtonClick() {
 *         alert(this.myString);
 *     }
 * }
 * ```
 *
 * **In Knockout:**
 *
 * ```html
 * <!--ko foreach: myArray-->
 *     <!-- no need for .bind here either -->
 *     <button data-bind="click: $root.controller.onButtonClick">Click me!</button>
 * <!--/ko-->
 * ```
 *
 * **Note:** remove the backslash before the @ symbol, YUIDoc won't display the example properly if there is only ``@autobind``
 *
 * @method autobind
 * @return PropertyDescriptor
 */
export default function autobind():MethodDecorator
{
	return function(target:Class,
	                propertyKey:string,
	                descriptor:TypedPropertyDescriptor<Function>):TypedPropertyDescriptor<Function>
	{
		let fn = descriptor.value;

		return {
			get() {
				if(this === target.prototype)
				{
					return fn;
				}

				let boundFn = fn.bind(this);

				Object.defineProperty(this, propertyKey, {
					value: boundFn,
					configurable: true,
					writable: true
				});

				return boundFn;
			}
		};
	}
}