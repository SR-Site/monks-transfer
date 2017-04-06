import Promise = require('bluebird');
import AbstractTask from "../../lib/temple/control/sequence/task/AbstractTask";
import DataManager from "../data/DataManager";
import IGatewayResult from "../net/gateway/result/IGatewayResult";
import IInitData from "../data/interface/IInitData";
import configManagerInstance from "../../lib/temple/config/configManagerInstance";
import {PropertyNames} from "../data/enum/ConfigNames";

/**
 * @namespace app.control
 * @class LoadInitTask
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadGoogleAnalytics extends AbstractTask
{
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void
	{
		(function(i, s, o, g, r, a?, m?)
		{
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function()
				{
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * <any>new Date();
			a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

		window['ga']('create', configManagerInstance.getProperty(PropertyNames.GOOGLE_ANALYTICS), 'auto');

		this.done();

	}

	/**
	 * @inheritDoc
	 */
	public destruct(): void
	{
		super.destruct();
	}
}

export default LoadGoogleAnalytics;
