import AbstractTransitionComponentController from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import MapPaginationTransitionController from 'app/component/map-pagination/MapPaginationTransitionController';
import IMapPaginationOptions from 'app/component/map-pagination/IMapPaginationOptions';
import MapPaginationViewModel from 'app/component/map-pagination/MapPaginationViewModel';

import Log from "lib/temple/util/Log";

class MapPaginationController extends AbstractTransitionComponentController<MapPaginationViewModel, IMapPaginationOptions, MapPaginationTransitionController>
{
	public static SELECT_INDEX: string = 'MapPaginationController.SELECT_INDEX';

	private _transitionInProgress: boolean = false;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.MapPagination');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this.destructibles.addKOSubscription(this.options.slides.subscribe((slides) =>
		{
			this.viewModel.total(slides.length - 1)
		}));

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method set transitionInProgress
	 * @param value
	 */
	public set transitionInProgress(value: boolean)
	{
		this._transitionInProgress = value
	}

	/**
	 * @public
	 * @method selectIndex
	 */
	public selectIndex(index: number): void
	{
		if(!this._transitionInProgress)
		{
			this._transitionInProgress = true;

			this.viewModel.activeIndex(index);

			this.dispatch(MapPaginationController.SELECT_INDEX, {index: index});
		}
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new MapPaginationTransitionController(this.element, this);

		super.allComponentsLoaded();
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

export default MapPaginationController;
