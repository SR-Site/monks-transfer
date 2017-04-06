import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');
import SlideVerticalGraphicController from "./SlideVerticalGraphicController";
import ISlideVerticalGraphicOptions from "./ISlideVerticalGraphicOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideVerticalGraphicViewModel extends AbstractTransitionComponentViewModel<SlideVerticalGraphicController, ISlideVerticalGraphicOptions>
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

export default SlideVerticalGraphicViewModel;
