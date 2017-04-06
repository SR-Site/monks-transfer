import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');
import SlideIconProgressController from "./SlideIconProgressController";
import ISlideIconProgressOptions from "./ISlideIconProgressOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideIconProgressViewModel extends AbstractTransitionComponentViewModel<SlideIconProgressController, ISlideIconProgressOptions>
{
	public StringUtils: Class = StringUtils;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.StringUtils = null;

		// always call this last
		super.destruct();
	}
}

export default SlideIconProgressViewModel;
