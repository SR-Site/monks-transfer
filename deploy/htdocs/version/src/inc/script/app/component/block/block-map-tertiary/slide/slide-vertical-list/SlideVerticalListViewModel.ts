import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');
import SlideVerticalListController from "./SlideVerticalListController";
import ISlideVerticalListOptions from "./ISlideVerticalListOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideVerticalListViewModel extends AbstractTransitionComponentViewModel<SlideVerticalListController, ISlideVerticalListOptions>
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

export default SlideVerticalListViewModel;
