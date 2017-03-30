import AbstractButtonViewModel from "./AbstractButtonViewModel";
import IAbstractButtonOptions from "./IAbstractButtonOptions";
import IMethod from "../../data/interface/action/IMethod";
import ILink from "../../data/interface/action/ILink";
import * as Gaia from "../../../lib/gaia/api/Gaia";
import LinkType from "../../data/enum/type/LinkType";
import ScrollUtils from "../../util/ScrollUtils";
import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import Branches from "../../data/enum/gaia/Branches";
import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";
import DataManager from "../../data/DataManager";
import PanelBlocks from "../../data/enum/block/PanelBlocks";
import LinkHelper from "../../util/LinkHelper";

abstract class AbstractButtonController<TViewModel extends AbstractButtonViewModel<any, any>,
	TOptions extends IAbstractButtonOptions,
	TTransitionController extends AbstractTransitionController<any>>
	extends AbstractTransitionComponentController<TViewModel, TOptions, TTransitionController>
{
	public init(): void
	{
		super.init();

		if(this.options.disabled !== void 0)
		{
			this.applyThreeWayBinding(this.options.disabled, this.viewModel.disabled);
		}

		this.addClassNames();
		this.checkAndSetHref();
	}

	/**
	 * @protected
	 * @method addClassNames
	 * @description some buttons require some extra classnames add them in this method
	 */
	protected addClassNames(): void
	{
		// Add the size class name
		if(this.options.size !== void 0)
		{
			this.element.classList.add(this.viewModel.size);
		}
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		super.allComponentsLoaded();

		// Sometimes we want the buttons to transition in as soon as the component is rendered
		if(this.options.transitionInOnInit && this.transitionController)
		{
			this.transitionController.transitionIn();
		}
	}

	/**
	 * @private
	 * @method setHref
	 */
	private checkAndSetHref(): void
	{
		LinkHelper.checkAndSetHref(<ILink>this.options.action, this.element)
	}

	/**
	 * @public
	 * @method openLink
	 */
	public openLink(): void
	{
		LinkHelper.openLink(<ILink>this.options.action, this.element)
	}

	/**
	 * @pubilc
	 * @method triggerMethod
	 */
	public triggerMethod(): void
	{
		(<IMethod>this.options.action).event();
	}
}

export default AbstractButtonController;
