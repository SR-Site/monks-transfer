import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import MapPaginationController from 'app/component/map-pagination/MapPaginationController';
import IMapPaginationOptions from 'app/component/map-pagination/IMapPaginationOptions';

import ko = require('knockout');
import StringUtils from "../../../lib/temple/util/type/StringUtils";

class MapPaginationViewModel extends AbstractTransitionComponentViewModel<MapPaginationController, IMapPaginationOptions>
{
	public StringUtils: Class = StringUtils;
	public activeIndex: KnockoutObservable<number> = ko.observable(0);
	public progress: KnockoutComputed<number>;

	constructor()
	{
		super();
	}

	/**
	 * @public
	 * @method handleClick
	 */
	public handleSelectClick(index: number): void
	{
		this.controller.selectIndex(index);
	}

	/**
	 * @public
	 * @method handlePreviousClick
	 */
	public handlePreviousClick(): void
	{
		if(this.activeIndex() - 1 >= 0)
		{
			this.controller.selectIndex(this.activeIndex() - 1);
		}
	}

	/**
	 * @public
	 * @method handleNextClick
	 */
	public handleNextClick(): void
	{
		if(this.activeIndex() + 1 < this.data.slides().length)
		{
			this.controller.selectIndex(this.activeIndex() + 1);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default MapPaginationViewModel;
