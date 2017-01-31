import configManagerInstance from "lib/temple/config/configManagerInstance";
import * as Gaia from "lib/gaia/api/Gaia";
import Branches from "../data/enum/gaia/Branches";
import Params from "../data/enum/gaia/Params";
import {PropertyNames} from "../data/enum/ConfigNames";

/**
 * Set up your routes here. See lib.gaia.router.GaiaRouter
 * or http://www.devmonks.nl/m/mediamonks/frontend/gaia/docs/docs-sitemap-and-routing
 * for more info.
 *
 * @namespace app.config
 * @class Routes
 */
class Routes
{
	public static HOME: string = 'home';
	public static CONTACT_US: string = 'contact-us';
	public static PAGE_NOT_FOUND: string = 'page-not-found';

	/**
	 * Set up the global config and all individual route configuration here
	 *
	 * You should remove _all_ routes here when starting a new project, except for the HOME route.
	 *
	 * @method init
	 */
	public static init(): void
	{
		let UINT = '^\\d+$';

		// position or negative numbers without decimals
		let INT = '^-?\\d+$';

		// position or negative numbers with or without decimals
		let NUMBER = '^-?\\d+(\\.\\d+)?$';

		// Only '1' or '0'
		let BOOLEAN = '^1|0$';

		// used for slugs (e.g. foo-bar)
		let SLUG = '^[\\w-]+$';


		// config setup
		Gaia.router.config()

		// default assertion for all 'id' parameters
			.assert(Params.ID, UINT)

			// default locale from ConfigManager
			.setDefaultLocale(configManagerInstance.getProperty(PropertyNames.DEFAULT_LOCALE))

			// regexp to fetch and strip the locale out of the url, matches /en_GB, /en
			.setLocaleRegExp(/^[\/]?(([a-z]{2}[_\-][A-Z]{2})|([a-z]{2}))(\/|$)/gi)

			// callback to check and change the route, can be async!
			//.redirectOnLanding((routeResult:IRouteResultItem, callback:(route:string) => void):void =>
			//{
			//	setTimeout(() =>
			//	{
			//		callback('/about');
			//	}, 1000);
			//})

			// enable visible url routing
			.enable();


		// init the router, do stuff based on config
		Gaia.router.init();

		//
		// ROUTE CONFIGURATION
		//

		// If you want a popup route, you should add it above the global deeplink route. Keep in mind that all routes are
		// send to the backend so if you want a popup route it would be best to access it only from the root ('/') route.

		// default page
		Gaia.router.page('/:' + Params.DEEPLINK + '*', Branches.CONTENT_PAGE);
	}
}

export default Routes;