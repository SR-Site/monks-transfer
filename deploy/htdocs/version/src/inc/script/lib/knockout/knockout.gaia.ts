import * as Gaia from "lib/gaia/api/Gaia";
import BranchTools from "lib/gaia/core/BranchTools";
import Log from "../temple/util/Log";
import LinkType from "../../app/data/enum/type/LinkType";
import ILink from "../../app/data/interface/action/ILink";
import Branches from "../../app/data/enum/gaia/Branches";
import ko = require('knockout');

class KnockoutGaiaGoto
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		/**
		 * Value should be:
		 * - a string with the base branch, or
		 * - an array with the 2 parameters for Gaia.api.goto [branch: string, deeplink: object]
		 */
		let value = valueAccessor();
		let $element = $(element);
		let branch = '';
		let deeplink: any = {};

		if(typeof value === 'string')
		{
			branch = BranchTools.getValidBranch(value);
			deeplink = {};

			if(branch.length < value.length)
			{
				Log.error('Temple.Knockout.GaiaGoto', 'string syntax with deeplink is not supported anymore for "' + value + '", use [branch, {}]');
			}
		}
		else
		{
			branch = value[0];
			deeplink = value[1];
		}

		let route = Gaia.router.assemble(branch, deeplink) || '/';

		$element.attr('href', KnockoutGaiaGoto.documentBase + route.substr(1));

		$(element).on(typeof(window['ontouchstart']) != 'undefined' ? 'tap' : 'click', (event: JQueryEventObject) =>
		{
			event.preventDefault();

			if(typeof value === 'string')
			{
				Gaia.api.goto(BranchTools.getValidBranch(value));
			}
			else
			{
				Gaia.api.goto(value[0], value[1]);
			}

		});

		return {};
	}
}

ko.bindingHandlers['gaiaGoto'] = KnockoutGaiaGoto;
ko.virtualElements.allowedBindings['gaiaGoto'] = true;


class KnockoutGaiaGotoRoute
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		/**
		 * Value should be:
		 * - a valid route string
		 */
		let value = valueAccessor();
		let $element = $(element);

		$element.attr('href', KnockoutGaiaGotoRoute.documentBase + (value.charAt(0) == '/' ? value.substr(1) : value));

		$(element).on(typeof(window['ontouchstart']) != 'undefined' ? 'tap' : 'click', (event: JQueryEventObject) =>
		{
			event.preventDefault();

			// todo
			Gaia.api.gotoRoute(value);
		});

		return {};
	}
}

ko.bindingHandlers['gaiaGotoRoute'] = KnockoutGaiaGotoRoute;
ko.virtualElements.allowedBindings['gaiaGotoRoute'] = true;


class KnockoutGaiaPopup
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		/**
		 * Value should be:
		 * - a string with the popupId, or
		 * - an array with the 2 parameters for Gaia.api.gotoPopup [popupId: string, deeplink: object]
		 */
		let value = valueAccessor();
		let $element = $(element);
		let branch = '';
		let deeplink: any = {};

		if(typeof value === 'string')
		{
			branch = BranchTools.getPopupBranch(value, Gaia.api.getCurrentBranch());
			deeplink = {};

			if(branch.length < value.length)
			{
				Log.error('Temple.Knockout.GaiaPopup', 'string syntax with deeplink is not supported anymore for "' + value + '", use [branch, {}]');
			}
		}
		else
		{
			branch = BranchTools.getPopupBranch(value[0], Gaia.api.getCurrentBranch());
			deeplink = value[1];
		}

		let route = Gaia.router.assemble(branch, deeplink) || '/';


		$element.attr('href', KnockoutGaiaPopup.documentBase + route.substr(1));

		$(element).on(typeof(window['ontouchstart']) != 'undefined' ? 'tap' : 'click', (event: JQueryEventObject) =>
		{
			event.preventDefault();

			if(typeof value === 'string')
			{
				Gaia.api.gotoPopup(value);
			}
			else
			{
				Gaia.api.gotoPopup(value[0], value[1]);
			}
		});

		return {};
	}
}

ko.bindingHandlers['gaiaPopup'] = KnockoutGaiaPopup;
ko.virtualElements.allowedBindings['gaiaPopup'] = true;


class KnockoutGaiaOpenLink
{
	static documentBase: string = $('meta[name="document-base"]').attr('content');

	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		if(valueAccessor())
		{
			let link: ILink = valueAccessor();
			let $element = $(element);

			switch(link.type)
			{
				case LinkType.INTERNAL:
				{
					// Only Set HREF if valid element.
					if(element.tagName === 'A')
					{
						element.setAttribute('href', KnockoutGaiaOpenLink.documentBase + link.target);
					}

					$(element).on('tap', (event: JQueryEventObject) =>
					{
						event.preventDefault();
						Gaia.api.goto(Branches.CONTENT_PAGE, {deeplink: link.target});
					});

					break;
				}
				case LinkType.EXTERNAL:
				{
					if(element.tagName === 'A')
					{
						$element.attr('href', link.target);
					}

					$(element).on('tap', (event: JQueryEventObject) =>
					{
						event.preventDefault();
						window.open(link.target);
					});

					break;
				}
			}
		}
		else
		{
			console.info('There is no valid route for element =>', element);
		}

		return {};
	}
}

ko.bindingHandlers['gaiaOpenLink'] = KnockoutGaiaOpenLink;
ko.virtualElements.allowedBindings['gaiaOpenLink'] = true;
