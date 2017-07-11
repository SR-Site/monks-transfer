import Promise = require('bluebird');
import AbstractTask from '../../lib/temple/control/sequence/task/AbstractTask';
import configManagerInstance from '../../lib/temple/config/configManagerInstance';
import { PropertyNames } from '../data/enum/ConfigNames';
import AssetLoader from 'app/util/AssetLoader';

/**
 * @namespace app.control
 * @class LoadPardotTracking
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadPardotTracking extends AbstractTask {
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void {
		window['piAId'] = configManagerInstance.getProperty(PropertyNames.PARDOT_APPLICATION_ID);
		window['piCId'] = configManagerInstance.getProperty(PropertyNames.PARDOT_CLIENT_ID);

		AssetLoader.loadScript(('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js')

		this.done()
	}
}

export default LoadPardotTracking;
