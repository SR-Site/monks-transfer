import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');
import SlideTextController from "./SlideTextController";
import ISlideTextOptions from "./ISlideTextOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideTextViewModel extends AbstractTransitionComponentViewModel<SlideTextController, ISlideTextOptions>
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

export default SlideTextViewModel;
