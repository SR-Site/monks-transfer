import DefaultPageViewModel from "app/page/DefaultPageViewModel";
import IndexPageController from "app/page/index/IndexPageController";
import ko = require('knockout');
import ButtonSize from "../../data/enum/layout/ButtonSize";

class IndexPageViewModel extends DefaultPageViewModel<IndexPageController>
{
	public ButtonSize:Class = ButtonSize;
	public startAdvertisingDisabled:KnockoutObservable<boolean> = ko.observable(false);

	/**
	 *	Overrides AbstractPageViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.startAdvertisingDisabled = null;

		// always call this last
		super.destruct();
	}
}

export default IndexPageViewModel;