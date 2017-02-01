import IDefaultSlideoutPanelOptions from "./IDefaultSlideoutPanelOptions";
import DefaultSlideoutPanelController from "./DefaultSlideoutPanelController";
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import Promise = require("bluebird");

class DefaultSlideoutPanelViewModel<TController, TOptions extends IDefaultSlideoutPanelOptions>
	extends DefaultComponentTransitionViewModel<DefaultSlideoutPanelController<TController, TOptions>, TOptions>
{
	public isOpen: KnockoutObservable<boolean> = ko.observable(false);
	public PanelBlocks: Class = PanelBlocks;
	public controller: DefaultSlideoutPanelController<TController, TOptions> & any;

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
