/**
 * @namespace temple.util
 * @class decorator
 */
import StringUtils from "../type/StringUtils";
/**
 * This is a **method decorator**.
 *
 * Replaces the original function with a method that displays a deprecation notice when the method is called, and
 * finally calls the original method.
 *
 * This is useful for warning users of future API updates where the method may be removed or changed.
 *
 * **Usage:**
 *
 * **Basic usage:**
 * ```typescript
 * \@deprecate()
 * public add1(n:number):number {
 *     return n + 1;
 * }
 *
 * // warning will show in devtools console
 * thing.add1(1);
 * ```
 *
 * **With self-supplied method:**
 * ```typescript
 * \@deprecate('Deprecation error: this method has been deprecated as of version XYZ. See documentation on upgrading from previous versions')
 * public add1(n:number):number {
 *     return n + 1;
 * }
 *
 * // our custom warning will show in devtools console
 * thing.add1(1);
 * ```
 *
 * **With supplied version number:**
 * ```typescript
 * \@deprecate('1.2.3.4', console.warn, true)
 * public add1(n:number):number {
 *     return n + 1;
 * }
 *
 * // our custom warning will show in devtools console
 * thing.add1(1);
 * ```
 *
 * @method deprecate
 * @param message {string} The message to be logged.
 * @param [logMethod=console.log] {function} The console method to call with the message string. This method should be in the console namespace (e.g. console.log, console.error, etc)
 * @param onlyVersion {boolean} When set to true, the message given in the first argument will be considered a version string and the default message will be logged with the given version number instead of 'future versions'
 * @returns MethodDecorator
 */
export default function deprecate(message:string = defaultDeprecationMessage,
                                  logMethod = console.warn,
                                  onlyVersion:boolean = false):MethodDecorator
{
	return function(target:Object,
	                key:string,
	                descriptor:TypedPropertyDescriptor<Function>):TypedPropertyDescriptor<Function>
	{
		let originalMethod = descriptor.value;

		// replace the className and method in the string and later add the message
		let logMessage = StringUtils.replaceVars(deprecateMethodSignatureTemplate, {
			className: (<any> target.constructor).name,
			method: key,
		}, true);

		if(onlyVersion == true)
		{
			// when onlyVersion is specified, use a different message which allows to set a version string
			logMessage = StringUtils.replaceVars(logMessage, {
				message: StringUtils.replaceVars(defaultDeprecationWithVersionMessage, {
					version: message
				})
			}, true);
		}
		else
		{
			// otherwise just use the default message
			logMessage = StringUtils.replaceVars(logMessage, {
				message: message
			}, true);
		}

		descriptor.value = function(...args:Array<any>)
		{
			logMethod.apply(console, [logMessage]);
			return originalMethod.apply(this, args);
		};

		return descriptor;
	}
}

export var deprecateMethodSignatureTemplate:string = '{className}#{method}: {message}';
export var defaultDeprecationMessage:string = 'Deprecation notice: this function will be removed in future versions.';
export var defaultDeprecationWithVersionMessage:string = 'Deprecation notice: this function has been deprecated in {version}';