import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import MarketSearchController from "app/component/market-search/MarketSearchController";
import IMarketSearchOptions from "app/component/market-search/IMarketSearchOptions";

import ko = require('knockout');
import IMarketDetail from "../block/block-market-map/interface/IMarketDetail";
import DataManager from "../../data/DataManager";

class MarketSearchViewModel extends AbstractTransitionComponentViewModel<MarketSearchController, IMarketSearchOptions>
{
	public query: KnockoutObservable<string> = ko.observable('');

	public suggestion: KnockoutObservable<{label: string; value: string;}> = ko.observable(null);
	public selectedMarket: KnockoutObservable<IMarketDetail> = ko.observable(null);
	public hasSuggestions: KnockoutObservable<boolean> = ko.observable(true);
	public noteActive: KnockoutComputed<boolean>;

	constructor()
	{
		super();

		this.noteActive = ko.computed(() =>
		{
			return !this.hasSuggestions() || (this.suggestion() && !this.selectedMarket())
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
		const suggestion = this.suggestion();

		if(suggestion)
		{
			// Select the market
			this.handleSelectMarket(suggestion.value);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.query = null;
		this.suggestion = null;

		this.selectedMarket = null;
		this.noteActive = null;

		// always call this last
		super.destruct();
	}
}

export default MarketSearchViewModel;
