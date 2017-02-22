import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockNetworkOverviewController from 'app/component/block/block-network-overview/BlockNetworkOverviewController';
import IBlockNetworkOverviewOptions from 'app/component/block/block-network-overview/IBlockNetworkOverviewOptions';

import ko = require('knockout');

class BlockNetworkOverviewViewModel extends AbstractBlockComponentViewModel<BlockNetworkOverviewController, IBlockNetworkOverviewOptions>
{
	public rows:KnockoutObservableArray<any> = ko.observableArray();

	public topList:KnockoutObservableArray<any> = ko.observableArray();
	public bottomList:KnockoutObservableArray<any> = ko.observableArray();

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.topList = null;
		this.bottomList = null;

		// always call this last
		super.destruct();
	}
}

export default BlockNetworkOverviewViewModel;
