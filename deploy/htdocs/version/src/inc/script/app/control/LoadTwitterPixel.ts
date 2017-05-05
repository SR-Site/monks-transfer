import Promise = require('bluebird');
import AbstractTask from '../../lib/temple/control/sequence/task/AbstractTask';
import configManagerInstance from '../../lib/temple/config/configManagerInstance';
import { PropertyNames } from '../data/enum/ConfigNames';

/**
 * @namespace app.control
 * @class LoadTwitterPixel
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadTwitterPixel extends AbstractTask {
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void {

		!function (e, t, n, s, u, a) {
			e['twq'] || (s = e['twq'] = function () {
				s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
			}, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
				a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
		}(window, document, 'script');

		twq('init', configManagerInstance.getProperty(PropertyNames.TWITTER_PIXEL_ID));

		this.done()
	}
}

export default LoadTwitterPixel;
