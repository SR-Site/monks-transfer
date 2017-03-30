import Browser from "../../lib/temple/util/Browser";
import bowser = require('bowser');

class BrowserUtil
{
	public static isSupportedBrowser(): boolean
	{
		console.info('[BrowserUtil] browser details:', bowser)

		if(
			(
				(bowser.windows) &&
				(
					(bowser.chrome && BrowserUtil.versionNumber() < 45) ||
					(bowser.firefox && BrowserUtil.versionNumber() < 41) ||
					(bowser.opera && BrowserUtil.versionNumber() < 44) ||
					(bowser.msedge && BrowserUtil.versionNumber() < 12 ) ||
					(bowser.msie && BrowserUtil.versionNumber() < 11)
				)
			) ||
			(
				(bowser.mac) &&
				(
					(bowser.chrome && BrowserUtil.versionNumber() < 45) ||
					(bowser.firefox && BrowserUtil.versionNumber() < 41) ||
					(bowser.safari && BrowserUtil.versionNumber() < 8) ||
					(bowser.opera && BrowserUtil.versionNumber() < 44)
				)
			) ||
			(
				(bowser.ios) &&
				(
					(BrowserUtil.versionNumber() < 8)
				)
			) ||
			(
				(bowser.android) &&
				(
					!bowser.chrome || BrowserUtil.osVersionNumber() < 5
				)
			)
		)
		{
			if(DEBUG)
			{
				console.error('[BrowserUtils] Browser is not supported');
			}

			return false;
		}

		return true;
	}

	/**
	 * @public static
	 * @method versionNumber
	 * @returns {number}
	 */
	public static versionNumber():number
	{
		return parseFloat(bowser.version);
	}

	/**
	 * @public static
	 * @method versionNumber
	 * @returns {number}
	 */
	public static osVersionNumber():number
	{
		return parseFloat(bowser.osversion);
	}
}

export default BrowserUtil;