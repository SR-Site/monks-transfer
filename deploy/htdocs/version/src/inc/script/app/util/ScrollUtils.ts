import BrowserName from "../data/enum/BrowserName";
import Promise = require("bluebird");
import bowser = require('bowser');

/**
 * @class ScrollUtils
 * @description Simple class used for basic scroll actions on the body, Firefox sets the scrollTop based on the html element
 * instead of  the body. Also I needed a place to put a scrollToPosition method that's used in several files.
 *
 */
class ScrollUtils
{
	private static EVENT_NAMESPACE:string = '.ScrollUtils';

	/**
	 * @public static
	 * @method set scrollTop
	 * @param y
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
	 * @private
	 * @method disableScroll
	 */
	public static disableScroll(): void
	{
		// Save current pageY offset when panel is opened so we can force to stay at this position.
		const pageY: number = window.pageYOffset;

		$(window).on('scroll' + ScrollUtils.EVENT_NAMESPACE, (event: JQueryMouseEventObject) =>
		{
			event.preventDefault();
			window.scrollTo(0, pageY);
		});
	}

	/**
	 * @private
	 * @method enableScroll
	 */
	public static enableScroll(): void
	{
		$(window).off('scroll' + ScrollUtils.EVENT_NAMESPACE);
	}

	/**
	 * Method used to get the scrollElement, for all browsers it's the document.body. Firefox and IE are the exception that uses
	 * the html element for setting the scrollTop position.
	 *
	 * @public static
	 * @method get scrollElement
	 * @returns {Element|HTMLElement}
	 */
	public static get scrollElement():Element
	{
		const browserName = bowser.name.toLowerCase();

		return browserName == BrowserName.FIREFOX || browserName == BrowserName.INTERNET_EXPLORER ? document.documentElement : document.body;
	}
}

export default ScrollUtils;
