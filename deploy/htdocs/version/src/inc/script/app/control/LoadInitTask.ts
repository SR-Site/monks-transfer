import Promise = require('bluebird');
import AbstractTask from "../../lib/temple/control/sequence/task/AbstractTask";
import DataManager from "../data/DataManager";
import IGatewayResult from "../net/gateway/result/IGatewayResult";
import IInitData from "../data/interface/IInitData";

/**
 * @namespace app.control
 * @class LoadInitTask
 * @extend temple.control.sequence.tasks.AbstractTask
 */
class LoadInitTask extends AbstractTask
{
	/**
	 * @inheritDoc
	 */
	public executeTaskHook(): void
	{
		const dm: DataManager = DataManager.getInstance();

		dm.serviceModel.contentService.getInit()
			.then((response: IGatewayResult<IInitData>) =>
			{
				dm.settingsModel.initDataModel.data = response.data;
			})
			.then(this.done.bind(this))
			.catch((reason) =>
			{
				console.error('[LoadInitTask] Failed loading the init task', reason)
			})
	}

	/**
	 * @inheritDoc
	 */
	public destruct(): void
	{
		super.destruct();
	}
}

export default LoadInitTask;
