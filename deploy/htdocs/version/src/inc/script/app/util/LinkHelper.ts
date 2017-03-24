import ILink from "../data/interface/action/ILink";
import LinkType from "../data/enum/type/LinkType";
import * as Gaia from "lib/gaia/api/Gaia";
import Branches from "../data/enum/gaia/Branches";
import ScrollUtils from "./ScrollUtils";
import DataManager from "../data/DataManager";
import PanelBlocks from "../data/enum/block/PanelBlocks";

class LinkHelper
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	/**
	 * @public
	 * @method checkAndSetHref
	 * @param link
	 * @param element
	 * @returns {void}
	 */
	public static checkAndSetHref(link: ILink, element: HTMLElement): void
	{
		// Only Set HREF if valid element.
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