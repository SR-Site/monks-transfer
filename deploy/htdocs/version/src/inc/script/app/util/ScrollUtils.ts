import BrowserName from "../data/enum/BrowserName";
import Browser from "lib/temple/util/Browser";
import Promise = require("bluebird");

/**
 * @class ScrollUtils
 * @description Simple class used for basic scroll actions on the body, Firefox sets the scrollTop based on the html element
 * instead of  the body. Also I needed a place to put a scrollToPosition method that's used in several files.
 *
 */
class ScrollUtils
{
	/**
	 * @public static
	 * @method set scrollTop
	 * @param {number} y
	 */
	public static set scrollTop(y:number)
	{
		this.scrollElement.scrollTop = y;
	}

	/**
	 * @public static
	 * @method get scrollTop
	 * @returns {number}
	 */
	public static get scrollTop():number
	{
		return this.scrollElement.scrollTop;
	}

	/**
	 * @public static
	 * @method scrollToPosition
	 * @param y
	 * @param duration
	 * @param ease
	 * @returns {Promise}
	 */
	public static scrollToPosition(y:number, duration:number = 0.3, ease:Ease = Cubic.easeInOut):Promise<any>
	{
		return new Promise((resolve:()=>void)=>
		{
			TweenLite.to(window, duration, {
				scrollTo: {
					y: y
				},
				ease: ease,
				onComplete: resolve
			});
		});
	}


	/**
	 * Method used to get the scrollElement, for all browsers it's the document.body. Firefox and IE are the exception that uses
	 * the html element for setting the scrollTop position.
	 *
	 * @private static
	 * @method get scrollElement
	 * @returns {Element|HTMLElement}
	 */
	private static get scrollElement():Element
	{
		return Browser.name == BrowserName.FIREFOX || Browser.name == BrowserName.INTERNET_EXPLORER ? document.documentElement : document.body;
	}
}

export default ScrollUtils;
