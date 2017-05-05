import Promise = require('bluebird');
import AbstractTask from "../../lib/temple/control/sequence/task/AbstractTask";
import configManagerInstance from "../../lib/temple/config/configManagerInstance";
import {PropertyNames} from "../data/enum/ConfigNames";

/**
 * @namespace app.control
 * @class LoadFacebookPixel
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadFacebookPixel extends AbstractTask
{
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void
	{
		if(!window['fbq'])
		{
			let n;

			n = window['fbq'] = function()
			{
				n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
			};

			if(!window['_fbq']) window['_fbq'] = n;

			n.push = n;
			n.loaded = !0;
			n.version = '2.0';
			n.queue = [];
			let t = document.createElement('script');
			t.async = !0;
			t.src = 'https://connect.facebook.net/en_US/fbevents.js';
			let s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(t, s)
		}

		fbq('init', configManagerInstance.getProperty(PropertyNames.FACEBOOK_PIXEL_ID), {
			em: 'insert_email_variable'
		});

		this.done()
	}
}

export default LoadFacebookPixel;
