/**
 * @module Temple
 * @namespace temple.utils.cookie
 * @class ICookieOptions
 */
interface ICookieOptions
{
	/**
	 * [optional] Expires date, or number of days in the future (or past) if set as a number
	 *
	 * @property expires {number|Date}
	 */
	expires?:number|Date;

	/**
	 * [optional] Store cookie as raw value, rather than running encodeURIComponent on the value first
	 *
	 * @property raw {boolean}
	 */
	raw?:boolean;

	/**
	 * [optional] Cookie path
	 *
	 * @property path {string}
	 */
	path?:string;

	/**
	 * [optional] Store/parse value as JSON
	 *
	 * @property json {boolean}
	 */
	json?:boolean;

	/**
	 * [optional] Cookie domain
	 *
	 * @property domain {string}
	 */
	domain?:string;

	/**
	 * [optional] Store as secure cookie
	 *
	 * @property secure {boolean}
	 */
	secure?:string;
}

const pluses = /\+/g;

function raw(s)
{
	return s;
}

function decoded(s)
{
	return decodeURIComponent(s.replace(pluses, ' '));
}

const defaultCookieOptions:ICookieOptions = {};

/**
 * See https://github.com/carhartl/jquery-cookie
 *
 * @module Temple
 * @namespace temple.utils
 * @class Cookie
 */
class Cookie
{
	/**
	 * Returns a string of the cookie, or object if JSON is enabled in the options
	 *
	 * @method get
	 * @static
	 * @param {string} key
	 * @param {ICookieOptions} options
	 * @returns {string|object}
	 */
	public static get(key:string, options:ICookieOptions = defaultCookieOptions):string|any
	{
		const decode = options.raw ? raw : decoded;
		const cookies = document.cookie.split('; ');
		for(let i = 0, l = cookies.length; i < l; i++)
		{
			const parts = cookies[i].split('=');
			if(decode(parts.shift()) === key)
			{
				const value = decode(parts.join('='));

				// When json is not set, try to use it
				if (options.json === void 0)
				{
					try
					{
						return JSON.parse(value);
					}
					catch(error)
					{
						return value;
					}
				}

				return options.json ? JSON.parse(value) : value;
			}
		}
	}

	public static set(key:string, value:any, options:ICookieOptions = defaultCookieOptions):void
	{
		// write
		if(value !== undefined)
		{
			options = $.extend({}, defaultCookieOptions, options);

			if(typeof options.expires === 'number')
			{
				const days = <number> options.expires;
				const t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			// When json is not set, but the value is an object, use json
			if (options.json === void 0 && typeof value === 'object')
			{
				options.json = true;
			}

			value = options.json ? JSON.stringify(value) : String(value);

			document.cookie = [
				encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + (value == null ? -1 : (<Date> options.expires).toUTCString()) : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''
			].join('');
		}
	}

	public static remove(key:string):void
	{
		if(Cookie.get(key) != void 0)
		{
			let expires = new Date();

			expires.setFullYear(1970);

			Cookie.set(key, null, {
				expires: expires
			});
		}
	}
}

export default Cookie;