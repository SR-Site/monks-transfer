import {IShareMethod, IShareMethodOptions} from "../ShareUtil";

/**
 * Shares an url using the Google+ share endpoint
 *
 * @author Floris Bernard
 * @class GooglePlusShareMethod
 * @namespace temple.util.sharing.methods
 */
export class GooglePlusShareMethod implements IShareMethod<IGooglePlusShareMethodOptions> {
	/**
	 * URL to the share endpoint
	 */
	public static SHARER_ENDPOINT_URL:string = 'https://plus.google.com/share';
	/**
	 * Default height of the popup window with the share dialog.
	 *
	 * @property DEFAULT_WINDOW_HEIGHT
	 * @type number
	 * @static
	 */
	public static DEFAULT_WINDOW_HEIGHT:number = 600;
	/**
	 * Default width of the popup window with the share dialog.
	 *
	 * @property DEFAULT_WINDOW_WIDTH
	 * @type number
	 * @static
	 */
	public static DEFAULT_WINDOW_WIDTH:number = 600;
	/**
	 * Name for this sharing method
	 *
	 * @property name
	 * @type string
	 */
	public name:string = 'Google+ share endpoint';
	/**
	 * Unique ID for this sharing method
	 *
	 * @property id
	 * @type string
	 */
	public id:string = 'google-plus';

	/**
	 * Opens an window sharing a url using the Google+ share endpoint. If no URL is provided,
	 * fallback to the current window.location.href.
	 * @method share
	 * @param options An object containing options for the Google Plus share. See the
	 * IGooglePlusShareMethodOptions interface for detailed information on each parameter.
	 * @returns {boolean} Returns true if a sharing window was opened.
	 */
	public share(options:IGooglePlusShareMethodOptions):boolean
	{
		var url = options.url || window.location.href;
		var width = options.window_width || GooglePlusShareMethod.DEFAULT_WINDOW_WIDTH;
		var height = options.window_height || GooglePlusShareMethod.DEFAULT_WINDOW_HEIGHT;
		var shareUrl = GooglePlusShareMethod.SHARER_ENDPOINT_URL + '?url=' + encodeURIComponent(url);

		if(options.lang) {
			shareUrl += '&hl=' + options.lang;
		}
		window.open(shareUrl,
				'google-plus-sharer', `toolbar=0,status=0,width=${width},height=${height}`);

		return true;
	}

}

/**
 * Interface of parameters that can be passed to the Google+ sharer.
 *
 * @class IGooglePlusShareMethodOptions
 * @namespace temple.util.sharing.methods
 * @extends temple.util.sharing.IShareMethodOptions
 */
export interface IGooglePlusShareMethodOptions extends IShareMethodOptions {
	/**
	 * The width of the popup window that opens for the Google+ share. Defaults to 600.
	 *
	 * @property window_width
	 * @type number
	 * @optional
	 */
	window_width? : number;
	/**
	 * The height of the popup window that opens for the Google+ share. Defaults to 600.
	 *
	 * @property window_height
	 * @type number
	 * @optional
	 */
	window_height? : number;
	/**
	 * The language code for the locale to use on the Google+ sharing page.
	 *
	 * @property lang
	 * @optional
	 * @type string
	 */
	lang? : string;
}

export default GooglePlusShareMethod;