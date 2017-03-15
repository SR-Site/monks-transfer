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

abstract class AbstractButtonController<
	TViewModel extends AbstractButtonViewModel<any, any>,
	TOptions extends IAbstractButtonOptions,
	TTransitionController extends AbstractTransitionController<any>>
extends AbstractTransitionComponentController<TViewModel, TOptions, TTransitionController>
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

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
		const link = <ILink>this.options.action;

		// Only Set HREF if valid element.
		if(this.element.tagName === 'A' && link.target !== void 0)
		{
			if(link.type == LinkType.INTERNAL)
			{
				this.element.setAttribute('href', AbstractButtonController.documentBase + link.target);
			}
			else if(link.type == LinkType.EXTERNAL)
			{
				this.element.setAttribute('href', link.target);
			}
		}
	}

	/**
	 * @public
	 * @method openLink
	 */
	public openLink(): void
	{
		const link = <ILink>this.options.action;

		switch(link.type)
		{
			case LinkType.INTERNAL:
			{
				Gaia.api.goto(Branches.CONTENT_PAGE, Object.assign({deeplink: link.target}, link.deeplink));

				break;
			}
			case LinkType.EXTERNAL:
			{
				window.open(link.target);

				break;
			}
			case LinkType.SCROLL_TO_NEXT_SECTION:
			{
				const headerHeight = (<HTMLElement>document.body.querySelector('.component-header')).offsetHeight;
				const parents = $(this.element).parents('[class^="component-block"]');
				const nextElement = $(parents[parents.length - 1]).next('[class^="component-block"]');

				ScrollUtils.scrollToPosition(
					nextElement.position().top - headerHeight
				);

				break;
			}
			case LinkType.CONTACT_US:
			{
				DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);

				break;
			}
			default:
			{
				console.warn('[AbstractButtonController] Unsupported link type');
				break;
			}
		}
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
