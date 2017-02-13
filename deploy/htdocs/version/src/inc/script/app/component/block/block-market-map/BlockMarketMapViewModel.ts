import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockMarketMapController from 'app/component/block/block-market-map/BlockMarketMapController';
import IBlockMarketMapOptions from 'app/component/block/block-market-map/IBlockMarketMapOptions';

import ko = require('knockout');
import PanelBlocks from "../../../data/enum/block/PanelBlocks";
import DataManager from "../../../data/DataManager";
import IState from "./interface/IMarketDetail";
import StateModel from "../../../data/model/StateModel";
import IMarketDetail from "./interface/IMarketDetail";

class BlockMarketMapViewModel extends AbstractBlockComponentViewModel<BlockMarketMapController, IBlockMarketMapOptions>
{
	public sidePanelIsOpen: KnockoutObservable<boolean> = ko.observable(false);
	public selectedState: KnockoutObservable<IMarketDetail> = ko.observable(null);

	public searchQuery: KnockoutObservable<string> = ko.observable('');
	public autoCompleteValue: KnockoutComputed<IMarketDetail>;

	public stateList: KnockoutObservableArray<IMarketDetail> = ko.observableArray([]);
	public stateModel: StateModel = DataManager.getInstance().settingsModel.stateModel;

	constructor()
	{
		super();

		this.autoCompleteValue = ko.computed(() =>
		{
			const query = this.searchQuery().toLowerCase();
			const stateList = this.stateList();

			if(query.length >= 3)
			{
				for(let i = 0; i < stateList.length; i++)
				{
					const state = stateList[i];

					// Check for the city
					if(this.isMatch(query, state.city))
					{
						return state;
					}

					// Check for the state
					if(this.stateModel.hasItem(state.statePostalCode) &&
						this.isMatch(query, this.stateModel.getItemById(state.statePostalCode).label.toLowerCase()))
					{
						return state;
					}
				}
			}

			return null;
		})
	}

	/**
	 * @private
	 * @method isMatch
	 */
	private isMatch(query: string, source: string): boolean
	{
		const result = new RegExp('' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi').exec(source);

		return result && result.length > 0;
	}

	/**
	 * @public
	 * @method handleAutoCompleteClick
	 */
	public handleAutoCompleteClick(data: IMarketDetail): void
	{
		// Select the state
		this.onStateSelect(data);
	}

	/**
	 * @public
	 * @method handleSubmit
	 */
	public handleSubmit(): void
	{
		if(this.autoCompleteValue())
		{
			// Select the state
			this.onStateSelect(this.autoCompleteValue());
		}
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
	 * @method handleClearClick
	 */
	public handleClearClick(): void
	{
		this.controller.resetStateSelection();
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
	public onStateSelect(data: IMarketDetail): void
	{
		if(this.selectedState() == data)
		{
			this.selectedState(null);

			// Clear the query
			this.searchQuery('');
		}
		else
		{
			this.selectedState(data);
			this.searchQuery(data.city + ', ' + data.statePostalCode);
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
