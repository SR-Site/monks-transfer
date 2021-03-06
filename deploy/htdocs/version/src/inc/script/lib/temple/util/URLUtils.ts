import StringUtils from "lib/temple/util/type/StringUtils";

/**
 * This class contains some functions for URLs.
 *
 * @module Temple
 * @namespace temple.utils
 * @class URLUtils
 * @author Thijs Broerse
 */
class URLUtils
{
	/**
	 * Provides the value of a specific query parameter.
	 *
	 * @method getParameter
	 * @static
	 * @param {string} url The url to get the parameter from.
	 * @param {string} param Parameter name.
	 * @return {string}
	 */
	public static getParameter(url: string, param: string): string
	{
		var index: number = url.indexOf('?');
		if(index != -1)
		{
			url = url.substr(index + 1);
			var params: Array<string> = url.split('&');
			var p: Array<string>;
			var i: number = params.length;
			while(i--)
			{
				p = params[i].split('=');
				if(p[0] == param)
				{
					return decodeURIComponent(p[1]);
				}
			}
		}
		return '';
	}

	/**
	 * @module Temple
	 * @namespace temple.utils
	 * @param url
	 * @param param
	 */
	public static removeParameter(url: string, param: string): string
	{
		//prefer to use l.search if you have a location/link object
		var urlparts = url.split('?');

		if(urlparts.length >= 2)
		{
			var prefix = encodeURIComponent(param) + '=';
			var pars = urlparts[1].split(/[&;]/g);

			//reverse iteration as may be destructive
			for(var i = pars.length; i-- > 0;)
			{
				//idiom for string.startsWith
				if(pars[i].lastIndexOf(prefix, 0) !== -1)
				{
					pars.splice(i, 1);
				}
			}

			url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
			return url;
		}
		else
		{
			return url;
		}
	}

	/**
	 * Checks if the URL contains a specific parameter
	 *
	 * @method hasParameter
	 * @static
	 * @param {string} url The url to check for the parameter.
	 * @param {string} param Parameter name.
	 * @return {boolean}
	 */
	public static hasParameter(url: string, param: string): boolean
	{
		return url.indexOf(param + '=') != -1;
	}

	/**
	 * Add a parameter to the url
	 *
	 * @method addParameter
	 * @static
	 * @param {string} url The url to add the parameter to.
	 * @param {string} param Parameter name.
	 * @return {boolean}
	 */
	public static addParameter(url: string, param: string, value: string): string
	{
		return url + (url.indexOf('?') == -1 ? '?' : '&') + param + '=' + value;
	}

	/**
	 * Set a parameter in the URL
	 *
	 * @method setParameter
	 * @static
	 * @param {string} url The url to add the parameter to.
	 * @param {string} param The parameter to set.
	 * @param {string} value The value of the parameter to set.
	 * @return {string}
	 */
	public static setParameter(url: string, param: string, value: string): string
	{
		if(URLUtils.hasParameter(url, param))
		{

			return url.replace(new RegExp('(' + param + '=)([^&]+)', 'g'), '$1' + value);
		}
		else
		{
			return URLUtils.addParameter(url, param, value);
		}
	}

	/**
	 * Get the file extension of an URL
	 *
	 * @method getFileExtension
	 * @static
	 * @param {string} url The url to get the file extension from.
	 * @return {string}
	 */
	public static getFileExtension(url: string): string
	{
		if(url == null)
		{
			return null;
		}
		if(url.indexOf('?') != -1)
		{
			url = StringUtils.beforeFirst(url, '?');
		}
		return StringUtils.afterLast(url, '.');
	}

	/**
	 * Checks if a url is absolute (true) or relative (false)
	 *
	 * @method isAbsolute
	 * @static
	 * @param {string} url The url to get the file extension from.
	 * @return {boolean}
	 */
	public static isAbsolute(url: string): boolean
	{
		return /^[\w-\.]*:/.test(url);
	}
}

export default URLUtils;