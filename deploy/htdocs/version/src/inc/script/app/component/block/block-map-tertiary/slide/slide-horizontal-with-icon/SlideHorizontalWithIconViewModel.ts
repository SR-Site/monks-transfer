import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import SlideHorizontalWithIconController from "./SlideHorizontalWithIconController";
import ISlideHorizontalWithIconOptions from "./ISlideHorizontalWithIconOptions";

import ko = require('knockout');
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideHorizontalWithIconViewModel extends AbstractTransitionComponentViewModel<SlideHorizontalWithIconController, ISlideHorizontalWithIconOptions>
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

export default SlideHorizontalWithIconViewModel;
