import Promise = require('bluebird');
import AbstractTask from '../../lib/temple/control/sequence/task/AbstractTask';
import configManagerInstance from '../../lib/temple/config/configManagerInstance';
import { PropertyNames } from '../data/enum/ConfigNames';
import AssetLoader from 'app/util/AssetLoader';

/**
 * @namespace app.control
 * @class LoadForensics
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadForensics extends AbstractTask {
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void {
		AssetLoader.loadScript(
			`https://secure.leadforensics.com/js/${configManagerInstance.getProperty(PropertyNames.FORENSICS_ID)}.js`)

		this.done()
	}
}

export default LoadForensics;
