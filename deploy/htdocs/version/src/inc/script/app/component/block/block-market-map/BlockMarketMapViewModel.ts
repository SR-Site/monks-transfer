import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMarketMapController from 'app/component/block/block-market-map/BlockMarketMapController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';

import ko = require('knockout');
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import DataManager from "../../../data/DataManager";
import IState from "./interface/IState";

class BlockMarketMapViewModel extends AbstractBlockComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
{
	public sidePanelIsOpen: KnockoutObservable<boolean> = ko.observable(false);
	public selectedState: KnockoutObservable<{id: number;value: string;}> = ko.observable(null);

	public stateList: KnockoutObservableArray<IState> = ko.observableArray([]);

	/**
	 * @public
	 * @method handleServiceClick
	 */
	public handleServiceClick(): void
	{
		this.controller.openContactPanel()
	}

	/**
	 * @public
	 * @method toggleSidePanel
	 */
	public toggleSidePanel(): void
	{
		this.sidePanelIsOpen(!this.sidePanelIsOpen());
	}

	/**
	 * @public
	 * @method onStateSelect
	 */
	public onStateSelect(data: {id: number;value: string}): void
	{
		if(this.selectedState() == data)
		{
			this.selectedState(null);
		}
		else
		{
			this.selectedState(data);
		}

		// Update the map
		this.controller.updateDataLayer();
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockMarketMapViewModel;
