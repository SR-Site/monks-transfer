import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import HeaderTransitionController from "app/component/header/HeaderTransitionController";
import IHeaderOptions from "app/component/header/IHeaderOptions";
import HeaderViewModel from "app/component/header/HeaderViewModel";
import Log from "lib/temple/util/Log";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ScrollUtils from "../../util/ScrollUtils";
import KeyCode from "../../../lib/temple/util/key/KeyCode";
import MenuEvent from "../../event/MenuEvent";

class HeaderController extends AbstractTransitionComponentController<HeaderViewModel, IHeaderOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.Header');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new HeaderTransitionController(this.element, this);

		this.destructibles.add(new NativeEventListener(window, 'scroll', this.handleScroll.bind(this)));
		this.destructibles.add(new NativeEventListener(document, 'keyup', this.handleKeyUp.bind(this)));
	}

	/**
	 * @public
	 * @method closeMenu
	 */
	public closeMenu(): void
	{
		// Notify about the menu opening/closing
		this.dispatch(MenuEvent.CLOSE);

		// update the UI
		this.viewModel.menuButtonActive(false);
	}

	/**
	 * @public
	 * @method closeMenu
	 */
	public openMenu(): void
	{
		// Notify about the menu opening/closing
		this.dispatch(MenuEvent.OPEN);

		// update the UI
		this.viewModel.menuButtonActive(true);
	}

	/**
	 * @private
	 * @method handleKeyUp
	 */
	private handleKeyUp(event: KeyboardEvent): void
	{
		if(event.keyCode === KeyCode.ESCAPE && this.viewModel.menuButtonActive())
		{
			this.closeMenu();
		}
	}

	/**
	 * @public
	 * @method get menuIsActive
	 * @returns {any}
	 */
	public get menuIsActive(): boolean
	{
		return this.viewModel.menuButtonActive();
	}

	/**
	 * @public
	 * @method get menuIsActive
	 * @returns {any}
	 */
	public set menuIsActive(isActive: boolean)
	{
		this.viewModel.menuButtonActive(isActive);
	}

	/**
	 * @private
	 * @method handleScroll
	 */
	private handleScroll(): void
	{
		this.viewModel.enableSolidBackground(ScrollUtils.scrollTop > this.element.offsetHeight);

		// Close the menu on scrolling
		if(this.viewModel.menuButtonActive())
		{
			this.closeMenu();
		}
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

export default HeaderController;
