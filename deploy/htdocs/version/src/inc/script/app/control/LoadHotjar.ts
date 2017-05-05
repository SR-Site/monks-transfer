import Promise = require('bluebird');
import AbstractTask from '../../lib/temple/control/sequence/task/AbstractTask';
import configManagerInstance from '../../lib/temple/config/configManagerInstance';
import { PropertyNames } from '../data/enum/ConfigNames';

/**
 * @namespace app.control
 * @class LoadHotjar
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadHotjar extends AbstractTask {
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void {

		(function (h, o, t, j, a, r) {
			h['hj'] = h['hj'] || function () {
					(h['hj'].q = h['hj']['q'] || []).push(arguments)
				};
			h['_hjSettings'] = {
				hjid: configManagerInstance.getProperty(PropertyNames.HOTJAR_ID),
				hjsv: 5
			};
			a = o.getElementsByTagName('head')[0];
			r = o.createElement('script');
			r.async = 1;
			r.src = t + h['_hjSettings']['hjid'] + j + h['_hjSettings']['hjsv'];
			a.appendChild(r);
		})(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');

		this.done()
	}
}

export default LoadHotjar;
