import DefaultButtonViewModel from "../DefaultButtonViewModel";
import ButtonCircleArrowController from 'app/component/button/button-circle-arrow/ButtonCircleArrowController';
import IButtonCircleArrowOptions from 'app/component/button/button-circle-arrow/IButtonCircleArrowOptions';

import ko = require('knockout');
import Direction from "../../../data/enum/layout/Direction";
import Alignment from "../../../data/enum/layout/Alignment";

class ButtonCircleArrowViewModel extends DefaultButtonViewModel<ButtonCircleArrowController, IButtonCircleArrowOptions>
{
	public Direction:Enum = Direction;
	public Alignment:Enum = Alignment;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.Direction = null;
		this.Alignment = null;

		// always call this last
		super.destruct();
	}
}

export default ButtonCircleArrowViewModel;
