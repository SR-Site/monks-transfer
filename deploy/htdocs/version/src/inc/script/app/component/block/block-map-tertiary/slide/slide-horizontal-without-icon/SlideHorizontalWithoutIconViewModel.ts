import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');
import SlideHorizontalWithoutIconController from "./SlideHorizontalWithoutIconController";
import ISlideHorizontalWithoutIconOptions from "./ISlideHorizontalWithoutIconOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideHorizontalWithoutIconViewModel extends AbstractTransitionComponentViewModel<SlideHorizontalWithoutIconController, ISlideHorizontalWithoutIconOptions>
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

export default SlideHorizontalWithoutIconViewModel;
