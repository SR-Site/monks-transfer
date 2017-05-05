import DataManager from "app/data/DataManager";
import ko = require('knockout');
import configManagerInstance from "lib/temple/config/configManagerInstance";
import config from "app/config/config";
import Routes from "app/config/Routes";

import Sequence from "lib/temple/control/sequence/Sequence";
import MethodTask from "lib/temple/control/sequence/task/MethodTask";
import ITask from "lib/temple/control/sequence/task/ITask";
import DevBarTask from "app/control/DevBarTask";
import Log from 'lib/temple/util/Log';
import {EnvironmentNames} from "../data/enum/ConfigNames";
import LoadInitTask from "./LoadInitTask";
import InitLocaleTask from "./InitLocaleTask";
import bowser = require('bowser');
import LoadJSONTask from "../../lib/temple/control/sequence/task/loader/LoadJSONTask";
import IState from "../data/interface/IState";
import ITertiaryMapData from "../data/interface/ITertiaryMapData";
import BrowserUtil from "../util/BrowserUtil";
import LoadGoogleAnalytics from "./LoadGoogleAnalytics";
import LoadFacebookPixel from 'app/control/LoadFacebookPixel';
import LoadTwitterPixel from 'app/control/LoadTwitterPixel';
import LoadLinkedInPixel from 'app/control/LoadLinkedInPixel';
import LoadHotjar from 'app/control/LoadHotjar';

// localization
//import InitLocaleTask from "app/control/InitLocaleTask";

/**
 * @namespace app.control
 * @class StartUp
 */
class StartUp
{
	private _log = new Log('app.control.StartUp');

	/**
	 * Initializes knockout allowBindings
	 *
	 * @class StartUp
	 * @constructor
	 */
	constructor()
	{
		window['ko'] = ko;
	}

	public execute(callback: () => void): void
	{
		this._log.log('Execute');

		let sequence = new Sequence();

		if(BrowserUtil.isSupportedBrowser())
		{
			if(!bowser.tablet && !bowser.mobile)
			{
				document.getElementsByTagName('html')[0].className += ' is-desktop';
			}

			if(bowser.ipad) {
				document.getElementsByTagName('html')[0].className += ' is-ipad';
			}

			configManagerInstance.init(config.config, config.environment);

			// just because we need it here!
			DataManager.getInstance();

			DataManager.getInstance().setupGateway();
			DataManager.getInstance().setupServices();

			Routes.init();

			// Only enable debug mode on local
			DEBUG = configManagerInstance.getEnvironment() === EnvironmentNames.LOCAL;

			if(DEBUG && configManagerInstance.getEnvironment() != EnvironmentNames.PRODUCTION)
			{
				sequence.add(new DevBarTask());
			}

			sequence.add(new LoadInitTask());
			sequence.add(new LoadGoogleAnalytics());
			sequence.add(new LoadFacebookPixel());
			sequence.add(new LoadTwitterPixel());
			sequence.add(new LoadLinkedInPixel());
			sequence.add(new LoadHotjar());

			/**
			 * See the "MapTertiaryData.ts" file for the id's of each of the data set
			 */
			sequence.add(new LoadJSONTask('data/json/map-tertiary-data.json', this.handleMapTertiaryLoaded.bind(this)));
			sequence.add(new LoadJSONTask('data/json/states.json', this.handleStatesLoaded.bind(this)));

			// add your own tasks
			sequence.add(new InitLocaleTask());

			// do this last
			sequence.add(new MethodTask(callback));
		}
		else
		{
			sequence.add(new MethodTask(() =>
			{
				// Browser is not supported so do not fire the callback and cancel Gaia!
				var container = <HTMLElement>document.body.querySelector('[data-gaia-container="main"]');
				var title = '<h2>Browser not supported.</h2>';
				var copy = 'Your browser is out-of-date, please update to a more up-to-date version.';

				var notSupportedMessage = document.createElement('div');

				notSupportedMessage.className = 'not-supported';
				notSupportedMessage.innerHTML = title + '<br/> ' + copy;

				// Inject the copy
				container.appendChild(notSupportedMessage);
			}))
		}

		sequence.execute();
	}

	/**
	 * @private
	 * @method handleStatesLoaded
	 */
	private handleStatesLoaded(data: Array<IState>): void
	{
		DataManager.getInstance().settingsModel.stateModel.addItems(data);
	}

	/**
	 * @private
	 * @method handleMapTertiaryLoaded
	 */
	private handleMapTertiaryLoaded(data: Array<ITertiaryMapData>): void
	{
		DataManager.getInstance().settingsModel.tertiaryMapDataModel.addItems(data);
	}
}

export default StartUp;
