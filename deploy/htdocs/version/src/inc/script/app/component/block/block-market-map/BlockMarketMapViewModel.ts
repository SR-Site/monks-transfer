import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMarketMapController from "app/component/block/block-market-map/BlockMarketMapController";
import IBlockMarketMapOptions from "app/component/block/block-market-map/IBlockMarketMapOptions";
import DataManager from "../../../data/DataManager";
import IMarketDetail from "./interface/IMarketDetail";
import StateModel from "../../../data/model/StateModel";

import ko = require('knockout');

class BlockMarketMapViewModel extends AbstractBlockComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
{
	public marketList:KnockoutObservableArray<IMarketDetail> = ko.observableArray([]);
	public selectedMarket: KnockoutObservable<IMarketDetail> = ko.observable(null);

	public sidePanelIsOpen: KnockoutObservable<boolean> = ko.observable(false);

	public stateModel: StateModel = DataManager.getInstance().settingsModel.stateModel;

	constructor()
	{
		super();
	}

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
	 * @method handleZoomInClick
	 */
	public handleZoomInClick(): void
	{
		this.controller.zoomIn()
	}

	/**
	 * @public
	 * @method handleZoomOutClick
	 */
	public handleZoomOutClick(): void
	{
		this.controller.zoomOut();
	}

	/**
	 * @public
	 * @method handleSelectMarket
	 */
	public handleSelectMarket(market:IMarketDetail):void
	{
		this.controller.selectMarket(market);
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
