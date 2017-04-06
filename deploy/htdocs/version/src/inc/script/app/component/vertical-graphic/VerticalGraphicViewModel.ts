import AbstractTransitionComponentViewModel from "app/util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import VerticalGraphicController from 'app/component/vertical-graphic/VerticalGraphicController';
import IVerticalGraphicOptions from 'app/component/vertical-graphic/IVerticalGraphicOptions';

import ko = require('knockout');

class VerticalGraphicViewModel extends AbstractTransitionComponentViewModel<VerticalGraphicController, IVerticalGraphicOptions>
{
	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default VerticalGraphicViewModel;
