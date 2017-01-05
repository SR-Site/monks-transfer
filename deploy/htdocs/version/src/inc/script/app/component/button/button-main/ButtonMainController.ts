import DefaultButtonController from "../DefaultButtonController";
import ButtonMainTransitionController from 'app/component/button/button-main/ButtonMainTransitionController';
import IButtonMainOptions from 'app/component/button/button-main/IButtonMainOptions';
import ButtonMainViewModel from 'app/component/button/button-main/ButtonMainViewModel';

import Log from "lib/temple/util/Log";
import Theme from "../../../data/enum/style/Theme";

class ButtonMainController extends DefaultButtonController<ButtonMainViewModel, IButtonMainOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.ButtonMain');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();



		this._debug.log('Init');
	}

	/**
	 * @protected
	 * @method addClassNames
	 * @description some buttons require some extra classnames add them in this method
	 */
	protected addClassNames():void
	{
		// Default is the dark theme
		this.options.theme = this.options.theme === void 0 ? Theme.DARK : this.options.theme;

		// Add the theme class name
		this.element.classList.add(Theme[this.options.theme].toLowerCase());

		super.addClassNames();
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new ButtonMainTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default ButtonMainController;
