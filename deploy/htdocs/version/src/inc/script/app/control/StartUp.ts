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

		if(!bowser.tablet && !bowser.mobile)
		{
			document.getElementsByTagName('html')[0].className += ' is-desktop';
		}

		configManagerInstance.init(config.config, config.environment);

		// just because we need it here!
		DataManager.getInstance();

		DataManager.getInstance().setupGateway();
		DataManager.getInstance().setupServices();

		Routes.init();

		// Only enable debug mode on local
		DEBUG = configManagerInstance.getEnvironment() === EnvironmentNames.LOCAL;

		let sequence = new Sequence();

		if(DEBUG && configManagerInstance.getEnvironment() != EnvironmentNames.PRODUCTION)
		{
			sequence.add(new DevBarTask());
		}

		sequence.add(new LoadInitTask());
		sequence.add(new LoadJSONTask('data/json/states.json', this.handleStatesLoaded.bind(this)));

		// add your own tasks
		sequence.add(new InitLocaleTask());

		// do this last
		sequence.add(new MethodTask(callback));
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
}

export default StartUp;
