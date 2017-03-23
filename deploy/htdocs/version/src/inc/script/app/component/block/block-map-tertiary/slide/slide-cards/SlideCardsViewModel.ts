import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ko = require('knockout');
import SlideCardsController from "./SlideCardsController";
import ISlideCardsOptions from "./ISlideCardsOptions";
import StringUtils from "../../../../../../lib/temple/util/type/StringUtils";

class SlideCardsViewModel extends AbstractTransitionComponentViewModel<SlideCardsController, ISlideCardsOptions>
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

export default SlideCardsViewModel;
