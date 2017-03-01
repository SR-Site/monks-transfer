import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import ITertiaryMapSlide from "../../../data/interface/ITertiaryMapSlide";
import BlockMapTertiaryController from "./BlockMapTertiaryController";
import IBlockMapTertiaryOptions from "./IBlockMapTertiaryOptions";

import ko = require('knockout');
import MapTertiarySlideType from "./enum/MapTertiarySlideType";

class BlockMapTertiaryViewModel extends AbstractBlockComponentViewModel<BlockMapTertiaryController, IBlockMapTertiaryOptions>
{
	public activeSlide:KnockoutObservable<number> = ko.observable(0);
	public slides: KnockoutObservableArray<ITertiaryMapSlide> = ko.observableArray([]);
	public slideTypeMap: {[index: number]: string} = {
		[MapTertiarySlideType.RADIAL_PROGRESS]: 'block/block-map-tertiary/slide/slide-radial-progress',
		[MapTertiarySlideType.VERTICAL_GRAPHIC]: 'block/block-map-tertiary/slide/slide-radial-progress',
		[MapTertiarySlideType.HORIZONTAL_WITH_ICON]: 'block/block-map-tertiary/slide/slide-horizontal-with-icon',
		[MapTertiarySlideType.HORIZONTAL_WITHOUT_ICON]: 'block/block-map-tertiary/slide/slide-vertical-graphic',
	};

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.activeSlide = null;
		this.slides = null;
		this.slideTypeMap = null;

		// always call this last
		super.destruct();
	}
}

export default BlockMapTertiaryViewModel;
