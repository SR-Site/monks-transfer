import DefaultComponentController from "../DefaultComponentController";
import BlockImageCarouselTransitionController from 'app/component/block/block-image-carousel/BlockImageCarouselTransitionController';
import IBlockImageCarouselOptions from 'app/component/block/block-image-carousel/IBlockImageCarouselOptions';
import BlockImageCarouselViewModel from 'app/component/block/block-image-carousel/BlockImageCarouselViewModel';

import Log from "lib/temple/util/Log";
import InfiniteImageCarousel from "../../../util/infinite-carousel/InfiniteImageCarousel";

class BlockImageCarouselController extends DefaultComponentController<BlockImageCarouselViewModel, IBlockImageCarouselOptions>
{
	private _infiniteImageCarousel:InfiniteImageCarousel;

	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockImageCarousel');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._infiniteImageCarousel = new InfiniteImageCarousel(
			<HTMLElement>this.element.querySelector('.js-image-carousel')
		);

		this.applyThreeWayBinding(this._infiniteImageCarousel.realCurrentPage, this.viewModel.currentPage);

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method openIndex
	 * @param index
	 */
	public openIndex(index:number):void
	{
		this._infiniteImageCarousel.open(index);
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockImageCarouselTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		if(this._infiniteImageCarousel)
		{
			this._infiniteImageCarousel.destruct();
			this._infiniteImageCarousel = null;
		}

		// always call this last
		super.destruct();
	}
}

export default BlockImageCarouselController;