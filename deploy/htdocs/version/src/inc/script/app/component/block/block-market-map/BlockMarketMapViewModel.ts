import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockMarketMapController from 'app/component/block/block-market-map/BlockMarketMapController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';

import ko = require('knockout');
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import DataManager from "../../../data/DataManager";

class BlockMarketMapViewModel extends DefaultComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
{

	public sidePanelIsOpen:KnockoutObservable<boolean> = ko.observable(false);
	public selectedState:KnockoutObservable<{id:number;value:string;}> = ko.observable(null);

	// todo fetch from api or json?
	public stateList:KnockoutObservableArray<{id:number;value:string}> = ko.observableArray([
		{
			value: "New York City, NY",
			id: 0
		},
		{
			value: "Binghamton, NY",
			id: 1
		},
		{
			value: "Buffalo, NY",
			id: 2
		},
		{
			value: "Elmira, NY",
			id: 3
		},
		{
			value: "Watertown, NY",
			id: 4
		},
		{
			value: "Rochester, NY",
			id: 5
		},
		{
			value: "Syracuse, NY",
			id: 6
		},
		{
			value: "Utica, NY",
			id: 7
		},
		{
			value: "Elmira, NY",
			id: 8
		},
		{
			value: "Watertown, NY",
			id: 9
		},
		{
			value: "Rochester, NY",
			id: 10
		}
	]);

	/**
	 * @public
	 * @method handleServiceClick
	 */
	public handleServiceClick():void
	{
		DataManager.getInstance().panelController.transitionIn(PanelBlocks.CONTACT);
	}

	/**
	 * @public
	 * @method toggleSidePanel
	 */
	public toggleSidePanel():void
	{
		this.sidePanelIsOpen(!this.sidePanelIsOpen());
	}

	/**
	 * @public
	 * @method onStateSelect
	 */
	public onStateSelect(data:{id:number;value:string}):void
	{
		this.selectedState(data);
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
