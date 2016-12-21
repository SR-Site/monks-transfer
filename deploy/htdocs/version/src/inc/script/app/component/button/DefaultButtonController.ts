import DefaultButtonViewModel from "./DefaultButtonViewModel";
import IDefaultButtonOptions from "./IDefaultButtonOptions";
import IMethod from "../../data/interface/action/IMethod";
import ILink from "../../data/interface/action/ILink";
import * as Gaia from "../../../lib/gaia/api/Gaia";
import LinkType from "../../data/enum/type/LinkType";
import ScrollUtils from "../../util/ScrollUtils";
import DefaultComponentTransitionController from "../../util/component-transition/default-component-transition/DefaultComponentTransitionController";
import Branches from "../../data/enum/gaia/Branches";

class DefaultButtonController<T, U extends IDefaultButtonOptions> extends DefaultComponentTransitionController<DefaultButtonViewModel<T, U>, U>
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');
	public viewModel: DefaultButtonViewModel<T, U> & any;

	public init(): void
	{
		super.init();

		if(this.options.disabled !== void 0)
		{
			this.applyThreeWayBinding(this.options.disabled, this.viewModel.disabled);
		}

		this.checkAndSetHref();
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded():void
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
				this.element.setAttribute('href', DefaultButtonController.documentBase + link.target);
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
				let parents = $(this.element).parents('[class^="component-block"]');
				let nextElement = $(parents[parents.length - 1]).next('[class^="component-block"]');

				ScrollUtils.scrollToPosition(
					nextElement.offset().top
				);

				break;
			}
			default:
			{
				console.warn('[DefaultButtonController] Unsupported link type');
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

export default DefaultButtonController;
