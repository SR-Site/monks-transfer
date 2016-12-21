import {IShareMethod, IShareMethodOptions} from "../ShareUtil";

/**
 * Sharing method to share a link in a Facebook private message using the Send Dialog API. To use
 * this method, you will need to initialize the Facebook API with a valid app id. The user will
 * need to login to the app before being able to share.
 *
 * @author Floris Bernard
 * @class FacebookSendShareMethod
 * @namespace temple.util.sharing.methods
 *
 * @constructor
 * @param api The Facebook API to use. Usually this is the 'FB' object on window.
 */
export class FacebookSendShareMethod implements IShareMethod<IFacebookSendShareMethodOptions> {
	/**
	 * Name for this sharing method
	 *
	 * @property name
	 * @type string
	 */
	public name:string = 'Facebook Send Dialog';
	/**
	 * Unique ID for this sharing method
	 *
	 * @property id
	 * @type string
	 */
	public id:string = 'facebook-send';

	constructor(public api:Facebook) {

	}

	/**
	 * Shares a url using the Facebook Send Dialog API. If no URL is provided,
	 * fallback to the current window.location.href.
	 * @method share
	 * @param options An object containing options for the new post. See the
	 * IFacebookSendShareMethodOptions interface for detailed information on each parameter.
	 * @returns {boolean}
	 */
	public share(options:IFacebookSendShareMethodOptions):boolean
	{
		var params:any = {
			link : options.url || window.location.href,
			method : 'send'
		};
		if(options.to) {
			params.to = options.to;
		}

		if(options.callback) {
			this.api.ui(params, options.callback);
		} else {
			this.api.ui(params);
		}

		return true;
	}

}

/**
 * Interface for the options object that can be passed to the Facebook Send Dialog
 * sharer. Most options are passed directly to the Facebook API. Some options have
 * been renamed for consistency with other sharing methods.
 *
 * Please see the
 * [Facebook Documentation](https://developers.facebook.com/docs/sharing/reference/send-dialog)
 * for more info on each parameter.
 *
 * @class IFacebookSendShareMethodOptions
 * @namespace temple.util.sharing.methods
 * @extends temple.util.sharing.IShareMethodOptions
 */
export interface IFacebookSendShareMethodOptions extends IShareMethodOptions {
	/**
	 * The callback to pass the Facebook API.
	 * @param response The response object returned by the Facebook API, containing
	 * the post id if successfully shared.
	 * @method callback
	 * @optional
	 */
	callback? : (response:{post_id?: string; }) => any;
	/**
	 * A user ID of a recipient. Once the dialog comes up, the sender can specify additional people,
	 * and groups addresses as recipients. Sending content to a Facebook group will post it to the
	 * group's wall.
	 *
	 * @property to
	 * @type number
	 */
	to? : number;
}

export default FacebookSendShareMethod;