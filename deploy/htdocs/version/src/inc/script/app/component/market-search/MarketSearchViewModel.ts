import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import MarketSearchController from "app/component/market-search/MarketSearchController";
import IMarketSearchOptions from "app/component/market-search/IMarketSearchOptions";

import ko = require('knockout');
import IMarketDetail from "../block/block-market-map/interface/IMarketDetail";
import DataManager from "../../data/DataManager";
import {DeviceState} from "../../data/scss-shared/MediaQueries";

class MarketSearchViewModel extends AbstractTransitionComponentViewModel<MarketSearchController, IMarketSearchOptions>
{
	public query: KnockoutObservable<string> = ko.observable('');

	public suggestions: KnockoutObservableArray<{ label: string; value: string; }> = ko.observableArray([]);
	public selectedMarket: KnockoutObservable<IMarketDetail> = ko.observable(null);
	public hasSuggestions: KnockoutObservable<boolean> = ko.observable(true);
	public noteActive: KnockoutComputed<boolean>;
	public noteHeight: KnockoutComputed<string>;

	constructor()
	{
		super();

		this.noteHeight = ko.computed(() =>
		{
			const gridSize = this.deviceState() <= DeviceState.SMALL ? 16 : 8;
			return Math.max(1, Math.min(3, this.suggestions().length - 1)) * gridSize + 'rem'
		})
		this.noteActive = ko.computed(() =>
		{
			return !this.hasSuggestions() || (this.suggestions().length && !this.selectedMarket())
		})

	}

	/**
	 * @public
	 * @method handleClear
	 */
	public handleClear(): void
	{
		this.controller.clearSearch();
	}

	/**
	 * @public
	 * @method handleSelectMarket
	 * @param marketId
	 */
	public handleSelectMarket(marketId: string, notifyAboutChange: boolean = true): void
	{
		const market = this.controller.getMarketById(marketId);

		if(market)
		{
			// Keep track of the market
			this.selectedMarket(market);

			// Update the input
			this.query(this.controller.getMarketLabel(market));

			// Notify about the chosen option
			if(notifyAboutChange)
			{
				this.controller.dispatch(MarketSearchController.SELECT, market);
			}
		}
		else
		{
			console.error('[MarketSearchViewModel] Market with ' + marketId + ' is not found')
		}
	}

	/**
	 * @public
	 * @method handleSubmit
	 */
	public handleSubmit(): void
	{
		const suggestions = this.suggestions();

		if(suggestions.length)
		{
			this.handleSelectMarket(suggestions[0].value);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.query = null;
		this.suggestions = null;

		this.selectedMarket = null;
		this.noteActive = null;

		// always call this last
		super.destruct();
	}
}

export default MarketSearchViewModel;
