import ILink from "../data/interface/action/ILink";
import LinkType from "../data/enum/type/LinkType";
import * as Gaia from "lib/gaia/api/Gaia";
import Branches from "../data/enum/gaia/Branches";
import ScrollUtils from "./ScrollUtils";
import DataManager from "../data/DataManager";
import PanelBlocks from "../data/enum/block/PanelBlocks";
import StringUtils from "../../lib/temple/util/type/StringUtils";
import PageType from "../../lib/gaia/interface/PageType";

class LinkHelper
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	/**
	 * @public
	 * @static
	 * @method getRoute
	 * @description Get the route from the url and take landing routes in account
	 */
	public static getRoute(): string
	{
		let route = Gaia.api.getRoute().split('#')[0];
		let initDataModel = DataManager.getInstance().settingsModel.initDataModel;

		// If the route is a popup, strip the route for fetching the page content.
		if(Gaia.api.getPage(Gaia.api.getCurrentBranch()).type == PageType.POPUP)
		{
			route = initDataModel.landingRoute;
		}
		else
		{
			// We want to fetch this from the backend!
			route = route === '/' ? initDataModel.landingRoute : route;
		}

		return StringUtils.startsWith(route, '/') ? route.substr(1) : route;
	}

	/**
	 * @public static
	 * @method getLinkDataFromElement
	 * @param element
	 * @returns {ILink}
	 * @description Fetch the link data from an element if an inline link is used, see GaiaMain.ts for an example
	 */
	public static getLinkDataFromElement(element: HTMLElement): ILink
	{
		return {
			label: element.innerHTML,
			title: element.innerHTML,
			target: element.getAttribute('href'),
			type: parseInt(element.getAttribute('data-gaia-open-link'))
		}
	}

	/**
	 * @public
	 * @method checkAndSetHref
	 * @param link
	 * @param element
	 * @returns {void}
	 * @description Check the element type and set a absolute url so the user can ctrl + click the link and it will still open the correct page
	 */
	public static checkAndSetHref(link: ILink, element: HTMLElement): void
	{
		if(element.tagName === 'A' && link.target !== void 0)
		{
			if(link.type == LinkType.INTERNAL)
			{
				element.setAttribute('href', LinkHelper.documentBase + link.target);
			}
			else if(link.type == LinkType.EXTERNAL)
			{
				element.setAttribute('href', link.target);
			}
		}
	}

	/**
	 * @public static
	 * @method openLink
	 * @param link
	 * @param sectionElement
	 * @description Trigger the correct action for a link
	 */
	public static openLink(link: ILink, sectionElement: HTMLElement): void
	{
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
				const parents = $(sectionElement).parents('[class^="component-block"]');
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
}

export default LinkHelper;