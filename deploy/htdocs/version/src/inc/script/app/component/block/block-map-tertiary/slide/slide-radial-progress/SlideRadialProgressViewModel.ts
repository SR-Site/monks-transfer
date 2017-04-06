import AbstractTransitionComponentViewModel from "../../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import SlideRadialProgressController from "./SlideRadialProgressController";
import ISlideRadialProgressOptions from "./ISlideRadialProgressOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";
import ko = require('knockout');
import PercentageLoaderBorderType from "../../../../percentage-loader/enum/PercentageLoaderBorderType";

class SlideRadialProgressViewModel extends AbstractTransitionComponentViewModel<SlideRadialProgressController, ISlideRadialProgressOptions>
{
	public StringUtils: Class = StringUtils;
	public PercentageLoaderBorderType:Enum = PercentageLoaderBorderType;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.PercentageLoaderBorderType = null;

		// always call this last
		super.destruct();
	}
}

export default SlideRadialProgressViewModel;
