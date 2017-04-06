import AbstractBlockComponentController from "../AbstractBlockComponentController";

import MapPaginationController from "../../map-pagination/MapPaginationController";
import DataManager from "../../../data/DataManager";
import BlockMapTertiaryViewModel from "./BlockMapTertiaryViewModel";
import IBlockMapTertiaryOptions from "./IBlockMapTertiaryOptions";
import BlockMapTertiaryTransitionController from "./BlockMapTertiaryTransitionController";
import Log from "../../../../lib/temple/util/Log";
import DataEvent from "../../../../lib/temple/event/DataEvent";
import AbstractTransitionComponentController from "../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import {trackEvent} from "../../../util/Analytics";

class BlockMapTertiaryController extends AbstractBlockComponentController<BlockMapTertiaryViewModel, IBlockMapTertiaryOptions, BlockMapTertiaryTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockMapTertiary');
	private _dataManager: DataManager = DataManager.getInstance();

	private _slides: {[index: string]: AbstractTransitionComponentController<any, any, any>} = {};
	private _pagination: MapPaginationController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		// Find the matching data from the tertiaryMapmodel
		const tertiaryMapDataId = this.options.tertiaryMapData.toString();
		const tertiaryMapData = this._dataManager.settingsModel.tertiaryMapDataModel.getItemById(tertiaryMapDataId);

		this.viewModel.slides(tertiaryMapData.slides);
	}

	/**
	 * @public
	 * @method get activeSlide
	 * @returns {any<number>}
	 */
	public get activeSlide(): AbstractTransitionComponentController<any, any, any>
	{
		return this._slides[this.viewModel.activeSlide()];
	}

	/**
	 * @public
	 * @method handleSlideReady
	 */
	public handleSlideReady(index: number, controller: AbstractTransitionComponentController<any, any, any>): void
	{
		// Store the slide reference
		this._slides[index] = controller;
	}

	/**
	 * @public
	 * @method handleMapPaginationReady
	 */
	public handleMapPaginationReady(controller: MapPaginationController): void
	{
		this._pagination = controller;
		this._pagination.addEventListener(
			MapPaginationController.SELECT_INDEX,
			(event: DataEvent<{index: number}>) => this.openSlide(event.data.index)
		);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockMapTertiaryTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method openSlide
	 */
	private openSlide(index: number): void
	{
		trackEvent('map', 'click', this.viewModel.slides()[index].heading, index);

		this._slides[this.viewModel.activeSlide()].transitionOut()
			.then(() => this._slides[index].transitionIn())
			.then(() => this.viewModel.activeSlide(index))
			.then(() => this._pagination.transitionInProgress = false);
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

export default BlockMapTertiaryController;
