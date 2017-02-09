import AbstractButtonController from "../AbstractButtonController";
import ButtonMainTransitionController from "app/component/button/button-main/ButtonMainTransitionController";
import IButtonMainOptions from "app/component/button/button-main/IButtonMainOptions";
import ButtonMainViewModel from "app/component/button/button-main/ButtonMainViewModel";
import Log from "lib/temple/util/Log";
import Theme from "../../../data/enum/style/Theme";
import DataManager from "../../../data/DataManager";

class ButtonMainController extends AbstractButtonController<ButtonMainViewModel, IButtonMainOptions>
{
	public static BORDER_WIDTH: number = 5;

	public transitionController: ButtonMainTransitionController;

	private _backgroundStroke: HTMLElement;
	private _hoverStroke: HTMLElement;

	private _width: number = 0;
	private _height: number = 0;

	private _debug: Log = new Log('app.component.ButtonMain');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this._hoverStroke = <HTMLElement>this.element.querySelector('.hover-stroke');
		this._backgroundStroke = <HTMLElement>this.element.querySelector('.background');

		this.destructibles.addKOSubscription(DataManager.getInstance().deviceStateTracker.currentState.subscribe(this.handleDeviceStateChange.bind(this)))

		this.setSize();
	}

	/**
	 * @public
	 * @method fullPath
	 * @returns {number}
	 */
	public get fullPath(): number
	{
		return (this._width * 2) + (this._height * 2);
	}

	/**
	 * @public
	 * @method get height
	 * @returns {number}
	 */
	public get height(): number
	{
		return this._height;
	}

	/**
	 * @protected
	 * @method addClassNames
	 * @description some buttons require some extra classnames add them in this method
	 */
	protected addClassNames(): void
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
	protected allComponentsLoaded(): void
	{
		this.transitionController = new ButtonMainTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 * @private
	 * @method setSize
	 */
	private setSize(): void
	{
		if(this.element.offsetWidth > 0 && this.element.offsetHeight > 0)
		{
			this._hoverStroke.style.strokeWidth = ButtonMainController.BORDER_WIDTH + 'px';

			this._width = this.element.offsetWidth;
			this._height = this.element.offsetHeight;

			this._hoverStroke.setAttribute('width', this._width + 'px');
			this._hoverStroke.setAttribute('height', this._height  + 'px');

			this._backgroundStroke.setAttribute('width', this._width + 'px');
			this._backgroundStroke.setAttribute('height', this._height + 'px');


			// Calculate the dash array value's
			this._hoverStroke.style.strokeDasharray = '0px ' + this.fullPath + 'px';
			this._hoverStroke.style.strokeDashoffset = this._height / 2 + 'px';
		}
	}


	/**
	 * @private
	 * @method handleResize
	 */
	private handleDeviceStateChange(): void
	{
		this.setSize();

		this.transitionController.resetHoverTimeline();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default ButtonMainController;
