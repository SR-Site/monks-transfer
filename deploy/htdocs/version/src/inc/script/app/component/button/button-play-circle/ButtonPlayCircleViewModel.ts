import DefaultButtonViewModel from "../AbstractButtonViewModel";
import ButtonPlayCircleController from 'app/component/button/button-play-circle/ButtonPlayCircleController';
import IButtonPlayCircleOptions from 'app/component/button/button-play-circle/IButtonPlayCircleOptions';

import ko = require('knockout');

class ButtonPlayCircleViewModel extends DefaultButtonViewModel<ButtonPlayCircleController, IButtonPlayCircleOptions>
{
	public isPlaying:KnockoutObservable<boolean> = ko.observable(false);

	/**
	 * @public
	 * @method handleClick
	 */
	public handleClick(event:MouseEvent): void
	{
		this.isPlaying(!this.isPlaying());

		super.handleClick(event);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.isPlaying = null;

		// always call this last
		super.destruct();
	}
}

export default ButtonPlayCircleViewModel;
