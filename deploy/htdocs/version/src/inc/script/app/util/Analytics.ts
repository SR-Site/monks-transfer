import IGaia from "lib/gaia/api/IGaia";
import GaiaRouter from "lib/gaia/router/GaiaRouter";
import GaiaEvent from "lib/gaia/event/GaiaEvent";

/**
 * @namespace app.util
 * @class Analytics
 */

/**
 * @method ga
 */
declare var ga: (...rest: Array<any>) => any;

/**
 * @method _gaq
 */
declare var _gaq: any;


/**
 * @method trackPage
 */
export function trackPage(page: string)
{
	if(DEBUG)
	{
		console.info("[Analytics] Track page: ['" + page + "']");
	}

	if(typeof ga !== 'undefined')
	{
		ga('send', 'pageview', page);
	}
	else if(typeof _gaq !== 'undefined')
	{
		_gaq.push(['_trackPageview', page]);
	}
}


/**
 * @method trackEvent
 */
export function trackEvent(category: string, action: string, label?: string, value?: number): void
{
	if(DEBUG)
	{
		console.info("[Analytics] Track event: [category: '" + category + "'] [action: '" + action + "'] [label: '" + label + "'] [value: '" + value + "']");
	}

	if(typeof ga !== 'undefined')
	{
		if(!isNaN(value) && label)
		{
			ga('send', 'event', category, action, label, value);
		}
		else if(label)
		{
			ga('send', 'event', category, action, label);
		}
		else
		{
			ga('send', 'event', category, action);
		}
	}
	else if(typeof _gaq !== 'undefined')
	{
		if(!isNaN(value) && label)
		{
			_gaq.push(<Array<any>>['_trackEvent', category, action, label, value]);
		}
		else if(label)
		{
			_gaq.push(<Array<any>>['_trackEvent', category, action, label]);
		}
		else
		{
			_gaq.push(<Array<any>>['_trackEvent', category, action]);
		}
	}
}

/**
 *
 * @param index     The slot for the custom variable. Required. This is a number whose value can range from 1 - 5, inclusive.
 *                  A custom variable should be placed in one slot only and not be re-used across different slots.
 *
 * @param name      The name for the custom variable. Required. This is a string that identifies the custom variable
 *                  and appears in the top-level Custom Variables report of the Analytics reports.
 *
 * @param value     The value for the custom variable. Required. This is a string that is paired with a name.
 *                  You can pair a number of values with a custom variable name. The value appears in the table list of the UI for a selected variable name.
 *                  Typically, you will have two or more values for a given name.
 *                  For example, you might define a custom variable name gender and supply male and female as two possible values.
 *
 * @param opt_scope     The scope for the custom variable. Optional. As described above, the scope defines the level of user engagement with your site.
 *                      It is a number whose possible values are 1 (visitor-level), 2 (session-level), or 3 (page-level).
 *                      When left undefined, the custom variable scope defaults to page-level interaction.
 */
//export function setCustomVar(index:number, name:string, value:any, opt_scope:number)
//{
//	ga(
//		'customVar',
//		index,
//		name,
//		value,
//		opt_scope
//	);
//}

/**
 *
 * @param enableGaiaTracking
 */
export function enableGaiaTracking(gaia: IGaia, router: GaiaRouter)
{
	gaia.afterGoto((event: GaiaEvent) =>
	{
		try
		{
			trackPage(gaia.getPage(gaia.getCurrentBranch()).getData('track') || event.routeResult.route);
		}
		catch(error)
		{
			//			console.log('error: ', error);
		}
	});
}