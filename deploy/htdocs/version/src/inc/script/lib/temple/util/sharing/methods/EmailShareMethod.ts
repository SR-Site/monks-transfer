import {IShareMethod, IShareMethodOptions} from "../ShareUtil";
import Browser from '../../Browser';

/**
 * Sharing method to share a message via email. Will open a mailto: link to trigger
 * an email client.
 *
 * @author Floris Bernard
 * @class EmailShareMethod
 * @namespace temple.util.sharing.methods
 */
export class EmailShareMethod implements IShareMethod<IEmailShareMethodOptions> {
	/**
	 * Name for this sharing method
	 *
	 * @property name
	 * @type string
	 */
	public name:string = 'Email';
	/**
	 * Unique ID for this sharing method
	 *
	 * @property id
	 * @type string
	 */
	public id:string = 'email';

	/**
	 * Sets window.location.href to a mailto: link to trigger the email client.
	 * @method share
	 * @param options An object containing options for the mailto link. See the
	 * IEmailShareMethodOptions interface for detailed information on each parameter.
	 * @returns {boolean} Returns true if a window.open call was executed.
	 */
	public share(options:IEmailShareMethodOptions):boolean
	{
		var queryParamOptions:Array<string> = ['bcc', 'cc', 'text', 'title'];
		var queryParamKeys:Array<string> = ['bcc', 'cc', 'body', 'subject'];

		if(options['subject']) {
			queryParamOptions[3] = 'subject';
		}

		var queryString = '?' + queryParamOptions.
			map((option:string, index:number) => {
				return options[option] == void(0) ?
					null : queryParamKeys[index] + '=' + encodeURIComponent(options[option]);
			}).
			filter((queryParam:string) => {
				return queryParam !== null;
			}).
			join('&');

		var mailTo = 'mailto:' + (options.to ? options.to : '') + queryString;


		if(Browser.platform == "ios" || true) {
			// iOS does not support window.open for mailto. Use a redirect
			window.location.href = mailTo;
		} /*else {
			// On other browsers, use window.open. This is to prevent a web mail client
			// (like gmail) replacing the current page instead of opening a new window.
			window.open(mailTo, '_blank', 'toolbar=0,status=0');
		}*/

		return true;
	}

}

/**
 * Interface of parameters that can be passed to the mailto link. Some parameters have
 * been renamed for consistency with other sharing methods.
 *
 * @class IEmailShareMethodOptions
 * @namespace temple.util.sharing.methods
 * @extends temple.util.sharing.IShareMethodOptions
 */
export interface IEmailShareMethodOptions extends IShareMethodOptions {
	/**
	 * (optional) The email address to send to
	 *
	 * @property to
	 * @type string
	 * @optional
	 */
	to? : string
	/**
	 * (optional) A BCC address to include in the email
	 *
	 * @property bcc
	 * @type Array<string>
	 * @optional
	 */
	bcc? : Array<string>;
	/**
	 * (optional) A CC address to include in the email.
	 *
	 * @property cc
	 * @type string
	 * @optional
	 */
	cc? : string;
	/**
	 * (optional) The body text for the email. Corresponds to the 'body' query parameter
	 *
	 * @property text
	 * @type Array<string>
	 * @optional
	 */
	text? : Array<string>;
	/**
	 * (optional) Alias for the 'subject' parameter for consistency with other sharing methods.
	 *
	 * @property title
	 * @type string
	 * @optional
	 */
	title? : string;
	/**
	 * (optional) The subject line for the email. Overrides the 'title' parameter
	 *
	 * @property subject
	 * @type string
	 * @optional
	 */
	subject? : string;
}

export default EmailShareMethod;