import IDefaultSlideoutPanelOptions from "./IDefaultSlideoutPanelOptions";
import DefaultSlideoutPanelController from "./DefaultSlideoutPanelController";
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import DefaultComponentTransitionViewModel from "../../util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import Promise = require("bluebird");

class DefaultSlideoutPanelViewModel<T, U extends IDefaultSlideoutPanelOptions> extends DefaultComponentTransitionViewModel<DefaultSlideoutPanelController<T, U>, U>
{
	public isOpen: KnockoutObservable<boolean> = ko.observable(false);
	public PanelBlocks: Class = PanelBlocks;
	public controller:DefaultSlideoutPanelController<T, U> & any;

	/**
	 * @public
	 * @method handleCloseClick
	 */
	public handleCloseClick(): Promise<any>
	{
		return this.controller.transitionOut();
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.isOpen = null;

		// always call this last
		super.destruct();
	}
}

export default DefaultSlideoutPanelViewModel;
