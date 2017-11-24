import bowser from 'bowser';

export default class ScrollUtil {
	/**
	 * @public
	 * @static
	 * @method scrollTop
	 * @description Get the window scroll position
	 * @returns {number}
	 */
	public static scrollTop(): number {
		return ScrollUtil.scrollElement().scrollTop;
	}

	/**
	 * @public
	 * @static
	 * @method scrollElement
	 * @description Get the correct scroll element, some browsers use other elements to determine the scrollTop
	 * @returns {Element}
	 */
	public static scrollElement(): Element {
		if (bowser.safari || bowser.msedge) {
			return document.body;
		} else {
			return document.documentElement;
		}
	}
}
