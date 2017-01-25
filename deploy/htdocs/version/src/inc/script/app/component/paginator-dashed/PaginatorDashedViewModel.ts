import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import PaginatorDashedController from 'app/component/paginator-dashed/PaginatorDashedController';
import IPaginatorDashedOptions from 'app/component/paginator-dashed/IPaginatorDashedOptions';

import ko = require('knockout');
import CarouselEvent from "../../util/infinite-carousel/event/CarouselEvent";

class PaginatorDashedViewModel extends DefaultComponentTransitionViewModel<PaginatorDashedController, IPaginatorDashedOptions>
{

	/**
	 * @public
	 * @method handlePaginationClick
	 */
	public handlePaginationClick(index:number):void
	{
		this.controller.dispatch(CarouselEvent.OPEN, {index: index});
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

export default PaginatorDashedViewModel;
