import IDefaultSlideoutPanelOptions from "./IDefaultSlideoutPanelOptions";
import DefaultSlideoutPanelController from "./DefaultSlideoutPanelController";
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import Promise = require("bluebird");

class DefaultSlideoutPanelViewModel<
	TController extends DefaultSlideoutPanelController<any, any, any>,
	TOptions extends IDefaultSlideoutPanelOptions>
	extends DefaultComponentTransitionViewModel<TController, TOptions>
{
	public isOpen: KnockoutObservable<boolean> = ko.observable(false);
	public PanelBlocks: Class = PanelBlocks;

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
