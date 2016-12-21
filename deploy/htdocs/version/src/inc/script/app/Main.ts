import GaiaMain from "lib/gaia/core/GaiaMain";
import StartUp from "app/control/StartUp";
import ISitemap from "lib/gaia/interface/ISitemap";
import Log from 'lib/temple/util/Log';

/**
 * Where it all start
 *
 * @namespace app
 * @class Main
 * @extend gaia.core.GaiaMain
 */
class Main extends GaiaMain
{
	private _log = new Log('app.Main');

	/**
	 * @method constructor
	 * @param {app.config.sitemap} sitemap
	 */
	constructor(sitemap:ISitemap)
	{
		super();

		new StartUp().execute(() =>
		{
			this._log.log('StartUp complete, starting Gaia...');
			this.startGaia(sitemap);
		});
	}

	/**
	 * @method onInit
	 */
	public onInit()
	{
		super.onInit();

		this._log.log('onInit');
	}
}

export default Main;