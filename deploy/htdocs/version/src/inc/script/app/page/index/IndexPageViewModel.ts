
import DefaultPageViewModel from "app/page/DefaultPageViewModel";
import IndexPageController from "app/page/index/IndexPageController";
import ko = require('knockout');
import ButtonSize from "../../data/enum/layout/ButtonSize";
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import DataManager from "../../data/DataManager";
import {DeviceState} from "../../data/scss-shared/MediaQueries";

class IndexPageViewModel extends DefaultPageViewModel<IndexPageController>
{
	public ButtonSize:Class = ButtonSize;
	public DeviceState:Enum = DeviceState;

	public hideContactButton:KnockoutObservable<boolean> = ko.observable(false);


	/**
	 * @public
	 * @method handleStartAdvertisingClick
	 */
	public handleStartAdvertisingClick():void
	{
		DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);
	}

	/**
	 *	Overrides AbstractPageViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.hideContactButton = null;

		// always call this last
		super.destruct();
	}
}

export default IndexPageViewModel;
