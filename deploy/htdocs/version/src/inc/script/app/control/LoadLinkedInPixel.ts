import Promise = require('bluebird');
import AbstractTask from '../../lib/temple/control/sequence/task/AbstractTask';
import configManagerInstance from '../../lib/temple/config/configManagerInstance';
import { PropertyNames } from '../data/enum/ConfigNames';

/**
 * @namespace app.control
 * @class LoadLinkedInPixel
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadLinkedInPixel extends AbstractTask {
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void {

		window['_linkedin_data_partner_id'] = configManagerInstance.getProperty(PropertyNames.LINKED_IN_PIXEL_ID);

		(function () {
			var s = document.getElementsByTagName('script')[0];
			var b = document.createElement('script');
			b.type = 'text/javascript';
			b.async = true;
			b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
			s.parentNode.insertBefore(b, s);
		})();

		this.done()
	}
}

export default LoadLinkedInPixel;
