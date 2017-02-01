import ko = require('knockout');
import Promise = require('bluebird');
import ImageHelper from "../../app/util/ImageHelper";
import IImage from "../../app/data/interface/media/IImage";
import {DeviceState} from "../../app/data/scss-shared/MediaQueries";
import FocusBorder from "../../app/util/FocusBorder";

class KnockoutFocusBorder
{
	public static BINDING_NAME: string = 'KnockoutFocusBorder';

	static init(element, valueAccessor: () => any): any
	{
		let data = valueAccessor();

		if(typeof data !== 'object')
		{
			data = {};
		}

		let focusBorder = new FocusBorder(element, data.value);

		ko.utils.domData.set(element, KnockoutFocusBorder.BINDING_NAME, focusBorder);

		// Cleaning up the Scrollbar instance
		let disposeCallback = () =>
		{
			ko.utils.domNodeDisposal.removeDisposeCallback(element, disposeCallback);
			focusBorder.destruct();
			focusBorder = null;
			ko.utils.domData.set(element, KnockoutFocusBorder.BINDING_NAME, null);
		};

		ko.utils.domNodeDisposal.addDisposeCallback(element, disposeCallback);
	}
}

ko.bindingHandlers['focusBorder'] = KnockoutFocusBorder;

export default KnockoutFocusBorder;
