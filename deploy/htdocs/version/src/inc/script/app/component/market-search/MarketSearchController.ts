import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import MarketSearchTransitionController from 'app/component/market-search/MarketSearchTransitionController';
import IMarketSearchOptions from 'app/component/market-search/IMarketSearchOptions';
import MarketSearchViewModel from 'app/component/market-search/MarketSearchViewModel';

import Log from "lib/temple/util/Log";
import IMarketDetail from "../block/block-market-map/interface/IMarketDetail";
import DataManager from "../../data/DataManager";
import StateModel from "../../data/model/StateModel";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";

class MarketSearchController extends AbstractTransitionComponentController<MarketSearchViewModel, IMarketSearchOptions, MarketSearchTransitionController>
{
	public static RESET: string = 'MarketSearchController.RESET';
	public static SELECT: string = 'MarketSearchController.SELECT';

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.MarketSearch');

	private _stateModel: StateModel = DataManager.getInstance().settingsModel.stateModel;
	private _autoComplete: autoComplete;
	private _choices: Array<Array<any>> = [];

	private _markets: Array<IMarketDetail>;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this.destructibles.addKOSubscription(
			this.viewModel.query.subscribe(ThrottleDebounce.debounce(this.handleQueryChange, 500, this))
		);

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method setMarket
	 */
	public setMarket(market: IMarketDetail): void
	{
		this.viewModel.handleSelectMarket(market.marketId, false);
	}

	/**
	 * @public
	 * @method setupAutoComplete
	 */
	public setupAutoComplete(markets: Array<IMarketDetail>): void
	{
		if(this.isDestructed()) return;

		this._markets = markets;

		this.parseChoices(markets);

		this._autoComplete = new autoComplete({
			selector: <HTMLElement>this.element.querySelector('input'),
			minChars: 3,
			source: this.handleSourceChange.bind(this)
		})
	}

	/**
	 * @public
	 * @method getMarketById
	 * @param marketId
	 * @returns {any}
	 */
	public getMarketById(marketId: string): IMarketDetail
	{
		// Find the market
		for(let i = 0; i < this._markets.length; i++)
		{
			let market = this._markets[i];

			if(market.marketId == marketId)
			{
				return market;
			}
		}

		return null;
	}

	/**
	 * @public
	 * @method clearSearch
	 */
	public clearSearch(): void
	{
		this.viewModel.selectedMarket(null);
		this.viewModel.suggestion(null);
		this.viewModel.hasSuggestions(true);

		this.viewModel.query('');

		this.dispatch(MarketSearchController.RESET);
	}

	/**
	 * @public
	 * @method getMarketLabel
	 */
	public getMarketLabel(market: IMarketDetail): string
	{
		return market.city + ', ' + this._stateModel.getItemById(market.statePostalCode).label
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new MarketSearchTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method handleQueryChange
	 */
	private handleQueryChange(query: string): void
	{
		if(query.length == 0)
		{
			this.clearSearch()
		}
	}

	/**
	 * @private
	 * @method handleSourceChange
	 */
	private handleSourceChange(term: string, suggest: (suggestions: Array<string>) => void): void
	{
		term = term.toLowerCase();

		let suggestions = [];

		for(let i = 0; i < this._choices.length; i++)
		{
			if(~(this._choices[i][0] + ' ' + this._choices[i][1]).toLowerCase().indexOf(term))
			{
				suggestions.push(this._choices[i]);
			}
		}

		this.viewModel.hasSuggestions(suggestions.length > 0);
		this.viewModel.suggestion(null);

		if(suggestions.length)
		{
			// Only the first item
			this.viewModel.suggestion({
				label: suggestions[0][0],
				value: suggestions[0][1]
			});
		}
	}


	/**
	 * @private
	 * @method parseChoices
	 * @param markets
	 */
	private parseChoices(markets: Array<IMarketDetail>): void
	{
		markets.forEach((market: IMarketDetail) =>
		{
			// Check if we have the label for the postal code
			if(this._stateModel.hasItem(market.statePostalCode))
			{
				this._choices.push([
					market.city + ', ' + this._stateModel.getItemById(market.statePostalCode).label,
					market.marketId
				]);
			}
		});
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default MarketSearchController;
