import DefaultPageController from "app/page/DefaultPageController";
import IndexPageViewModel from "app/page/index/IndexPageViewModel";
import CallbackCounter from "../../util/CallbackCounter";
import * as Gaia from "lib/gaia/api/Gaia";
import KeyCode from "../../../lib/temple/util/key/KeyCode";
import PageLoaderController from "../../component/page-loader/PageLoaderController";
import DataManager from "../../data/DataManager";
import FooterController from "../../component/footer/FooterController";
import HeaderController from "../../component/header/HeaderController";
import ButtonStartAdvertisingController from "../../component/button/button-start-advertising/ButtonStartAdvertisingController";
import MenuController from "../../component/menu/MenuController";
import MenuEvent from "../../event/MenuEvent";
import GlobalSlideoutPanelController from "../../component/slideout-panel/global-slideout-panel/GlobalSlideoutPanelController";
import Promise = require("bluebird");
import ko = require("knockout");
import bowser = require("bowser");
import VideoOverlayController from "../../component/video-overlay/VideoOverlayController";
import NotificationController from "../../component/notification/NotificationController";

class IndexPageController extends DefaultPageController<IndexPageViewModel>
{
	/**
	 * @public
	 * @property callbackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter: CallbackCounter = new CallbackCounter();

	private _dataManager: DataManager = DataManager.getInstance();

	/**
	 * @private
	 * @property _beforeGoto
	 */
	private _beforeGoto: (removeHijack?: boolean) => void;
	/**
	 * @private
	 * @property_beforeTransitionIn
	 */
	private _beforeTransitionIn: (removeHijack?: boolean) => void;

	private _headerController: HeaderController;
	private _footerController: FooterController;
	private _menuController: MenuController;
	private _startAdvertising: ButtonStartAdvertisingController;

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._beforeTransitionIn = Gaia.api.beforeTransitionIn(this.handleBeforeTransitionIn.bind(this), true);
		this._beforeGoto = Gaia.api.beforeGoto(this.handleBeforeGoto.bind(this), true, false);

		if(DEBUG)
		{
			let gridElement = (<HTMLElement>this.element.querySelector('.grid'));

			document.addEventListener('keyup', (event: KeyboardEvent) =>
			{
				if(event.keyCode === KeyCode.NUM_1)
				{
					if(gridElement.classList.contains('is-active'))
					{
						gridElement.classList.remove('is-active');
					}
					else
					{
						gridElement.classList.add('is-active');
					}
				}
			})
		}
	}

	/**
	 * @private
	 * @method handleHeaderReady
	 */
	private handleHeaderReady(controller: HeaderController): void
	{
		this._headerController = controller;
		this._headerController.addEventListener(MenuEvent.OPEN, () => this._menuController.transitionIn());
		this._headerController.addEventListener(MenuEvent.CLOSE, () => this._menuController.transitionOut());
	}

	/**
	 * @public
	 * @method handleFooterReady
	 */
	public handleFooterReady(controller: FooterController): void
	{
		this._footerController = controller;
	}

	/**
	 * @public
	 * @method handleNotificationReady
	 */
	public handleNotificationReady(controller: NotificationController): void
	{
		this._dataManager.notification = controller;
	}

	/**
	 * @public
	 * @method handleFooterReady
	 */
	public handleMenuReady(controller: MenuController): void
	{
		this._menuController = controller;
		this._menuController.addEventListener(MenuEvent.CLOSE, () => this.closeMenu());
	}

	/**
	 * @public
	 * @method handleStartAdvertisingReady
	 */
	public handleStartAdvertisingReady(controller: ButtonStartAdvertisingController): void
	{
		this._startAdvertising = controller;

		// Listen to the page change
		this.destructibles.addKOSubscription(this._dataManager.hideContactButton.subscribe(this.handleHideContactButtonChange.bind(this)));
	}

	/**
	 * @private
	 * @method handleHideContactButtonChange
	 */
	private handleHideContactButtonChange(hideContactButton: boolean): void
	{
		if(hideContactButton)
		{
			this._startAdvertising.transitionOut();
		}
		else
		{
			this._startAdvertising.transitionIn();
		}
	}

	/**
	 * @private
	 * @method handlePageLoaderReady
	 */
	private handlePageLoaderReady(controller: PageLoaderController): void
	{
		DataManager.getInstance().pageLoader = controller;
	}

	/**
	 * @private
	 * @method handlePanelReady
	 */
	private handlePanelReady(controller: GlobalSlideoutPanelController): void
	{
		this._dataManager.panelController = controller;
	}

	/**
	 * @public
	 * @method handleVideoOverlayReady
	 */
	public handleVideoOverlayReady(controller: VideoOverlayController): void
	{
		this._dataManager.videoOverlay = controller;
	}


	/**
	 * @public
	 * @method closePane;
	 */
	public closePanel(): Promise<any>
	{
		if(this._dataManager.panelController.isOpen())
		{
			return this._dataManager.panelController.transitionOut();
		}
		else
		{
			return Promise.resolve();
		}
	}

	/**
	 * @private
	 * @method closeMenu
	 */
	private closeMenu(): Promise<any>
	{
		return this._menuController.transitionOut()
			.then(() =>
			{
				this._headerController.menuIsActive = false;
			})
	}

	/**
	 * @private
	 * @method handleBeforeGoto
	 */
	private handleBeforeGoto(): void
	{
		if(this._headerController.menuIsActive)
		{
			Promise.all([
				this.closePanel(),
				this.closeMenu()
			]).then(() => this._beforeGoto());
		}
		else
		{
			this.closePanel().then(() => this._beforeGoto());
		}
	}

	/**
	 * @private
	 * @method handleBeforeTransitionIn
	 */
	private handleBeforeTransitionIn(): void
	{
		const allComponentsLoaded: Promise<any> = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

		// Wait  for all components to be loaded
		allComponentsLoaded.then(() =>
		{
			if(bowser.ios)
			{
				// Note: If the header component is not  the first element in the DOM the fixed position
				// will make the overflow look weird and end up with the header being clipped
				document.body.insertBefore(this._dataManager.panelController.element, document.body.firstChild);
				
				// Note: Move the page loader to the root to overlap the fixed header element, this is super hacky but otherwise the fixed header on iOS get's clipped when scrolling
				document.body.insertBefore(this._dataManager.pageLoader.element, document.body.firstChild);

				// Note: If the header component is not  the first element in the DOM the fixed position
				// will make the overflow look weird and end up with the header being clipped
				document.body.insertBefore(this._headerController.element, document.body.firstChild);

			}

			this._beforeTransitionIn(true);
		})
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(): void
	{
		this.element.style.visibility = 'visible';

		DataManager.getInstance().pageLoader.transitionIn()
			.then(() => Promise.all([
				this._headerController.transitionIn(),
				this._footerController.transitionIn()
			]))
			.then(() => super.transitionIn());
	}

	/**
	 * @public
	 * @method transitionInComplete
	 */
	public transitionInComplete(): void
	{
		// Check on init
		this.handleHideContactButtonChange(this._dataManager.hideContactButton());

		super.transitionInComplete();
	}


	/**
	 *    Overrides AbstractPageController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this.callbackCounter)
		{
			this.callbackCounter.destruct();
			this.callbackCounter = null;
		}

		this._dataManager = null;
		this._beforeGoto = null;
		this._beforeTransitionIn = null;
		this._headerController = null;
		this._footerController = null;
		this._menuController = null;
		this._startAdvertising = null;

		// always call this last
		super.destruct();
	}
}

export default IndexPageController;
