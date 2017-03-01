import AbstractTransitionComponentViewModel from "../../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import SlideRadialProgressController from "./SlideRadialProgressController";
import ISlideRadialProgressOptions from "./ISlideRadialProgressOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";
import ko = require('knockout');

class SlideRadialProgressViewModel extends AbstractTransitionComponentViewModel<SlideRadialProgressController, ISlideRadialProgressOptions>
{
	public StringUtils: Class = StringUtils;


	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;

		// always call this last
		super.destruct();
	}
}

export default SlideRadialProgressViewModel;
