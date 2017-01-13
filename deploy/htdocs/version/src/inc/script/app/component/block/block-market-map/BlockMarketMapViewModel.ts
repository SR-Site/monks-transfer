import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMarketMapController from 'app/component/block/block-market-map/BlockMarketMapController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';

import ko = require('knockout');
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import DataManager from "../../../data/DataManager";

class BlockMarketMapViewModel extends DefaultComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
{

	/**
	 * @public
	 * @method handleServiceClick
	 */
	public handleServiceClick():void
	{
		DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockMarketMapViewModel;
