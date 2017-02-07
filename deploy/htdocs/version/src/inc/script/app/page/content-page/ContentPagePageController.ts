import ContentPagePageViewModel from "app/page/content-page/ContentPagePageViewModel";
import CallbackCounter from "../../util/CallbackCounter";
import DefaultPageController from "../DefaultPageController";
import AbstractBlockComponentController from "../../component/block/AbstractBlockComponentController";
import DefaultComponentViewModel from "../../component/block/AbstractBlockComponentViewModel";
import ScrollTracker, {ScrollTrackerPoint, ScrollTrackerEvent} from "../../../lib/temple/util/ScrollTracker";
import DataManager from "../../data/DataManager";
import * as Gaia from "lib/gaia/api/Gaia";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import GaiaHistoryEvent from "../../../lib/gaia/event/GaiaHistoryEvent";
import CommonEvent from "../../../lib/temple/event/CommonEvent";
import ScrollUtils from "../../util/ScrollUtils";
import PageType from "../../../lib/gaia/interface/PageType";
import Routes from "../../config/Routes";
import StringUtils from "../../../lib/temple/util/type/StringUtils";
import IPageLayout from "../../data/interface/layout/IPageLayout";

import ko = require("knockout");
import Promise = require("bluebird");

class ContentPagePageController extends DefaultPageController<ContentPagePageViewModel>
{
	/**
	 * @property callbackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter: CallbackCounter;
	/**
	 * @property _currentDeeplink
	 * @type {Object}
	 */
	private _currentDeeplink: Object;
	/**
	 * @property _beforeTransitionIn
	 * @type {(removeHijack:boolean)=>void}
	 */
	private _beforeTransitionIn: (removeHijack?: boolean) => void;
	/**
	 * @property _allComponentsLoaded
	 * @type {Promise<any>}
	 */
	private _allComponentsLoaded: Promise<any>;
	/**
	 * @property _components
	 * @type {Object}
	 */
	private _components: {[id: string]: AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>} = {};
	/**
	 * @property _scrollTracker
	 * @type {ScrollTracker}
	 */
	private _scrollTracker: ScrollTracker;
	/**
	 * @property _scrollTrackerPoints
	 * @type {Object}
	 */
	private _scrollTrackerPoints: {[id: string]: ScrollTrackerPoint} = {};
	/**
	 * @property _dataManager
	 * @type {DataManager}
	 */
	private _dataManager: DataManager = DataManager.getInstance();
	/**
	 * @property _handleScrollSectionInViewListener
	 * @type {()=>void}
	 */
	private _handleScrollSectionInViewListener: () => void;
	/**
	 * @property _handleScrollSectionOutViewListener
	 * @type {()=>void}
	 */
	private _handleScrollSectionOutViewListener: () => void;

	/**
	 * @public
	 * @method init
	 */
	public init(): void
	{
		super.init();

		this._currentDeeplink = Gaia.api.getDeeplink();

		// listen to window resize for recalculating the scroll positions
		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 500, this)));
	}

	/**
	 * @public
	 * @method get activeBlock
	 * @returns {KnockoutObservable<AbstractBlockComponentController<any, any>>}
	 */
	public get activeBlock(): KnockoutObservable<AbstractBlockComponentController<any, any>>
	{
		return this.viewModel.activeBlock;
	}

	/**
	 * @public
	 * @method get components
	 * @returns {AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>[]}
	 */
	public get components(): Array<AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>>
	{
		return Object.keys(this._components).map(key => this._components[key]);
	}

	/**
	 * @public
	 * @method onDeeplink
	 * @param event
	 */
	public onDeeplink(event: GaiaHistoryEvent): void
	{
		super.onDeeplink(event);

		// TODO: maybe do the check based on the deeplink data instead of a simple stringify, this works because the back-end decides the param order
		if(!Gaia.api.getPage(event.routeResult[0].branch).isPopup() &&
			JSON.stringify(this._currentDeeplink) != JSON.stringify(event.routeResult[0].deeplink))
		{
			this._dataManager.pageLoader.transitionIn()
				.then(() =>
				{
					this._currentDeeplink = event.routeResult[0].deeplink;

					this.viewModel.pageLayout([]);

					if(this.callbackCounter)
					{
						this.callbackCounter.destruct();
					}

					if(this._scrollTracker)
					{
						this._scrollTracker.destruct();
					}

					this._components = {};
					this._scrollTrackerPoints = {};
					this._allComponentsLoaded = null;

					this.startupPage()
						.catch((result) =>
						{
							throw result;
						})
				});
		}
	}

	/**
	 * @public
	 * @method handleComponentReady
	 * @param controller
	 */
	public handleComponentReady(controller: AbstractBlockComponentController<any, any>): void
	{
		// Some components change the entire view. For examle filter components.
		controller.addEventListener(CommonEvent.RESIZE, this.handleResize.bind(this));

		// After all components are loaded we want to transition them in individually
		this._components[controller.options.id + controller.eventNamespace] = controller;
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(): void
	{
		this.startupPage()
			.then(() => super.transitionIn())
			.catch((result) => super.transitionIn());

		// Check if we have a queryParam popup in the url.
		let popupUrl = Gaia.router.getQueryParam('popup');

		if(popupUrl)
		{
			let splitted = popupUrl.split('/');
			Gaia.api.gotoPopup(splitted.shift(), splitted);
		}
	}

	/**
	 * @private
	 * @method startupPage
	 */
	private startupPage(): Promise<any>
	{
		this.callbackCounter = new CallbackCounter();
		this._scrollTracker = new ScrollTracker();

		ScrollUtils.scrollTop = 0;

		return this.getPageLayout()
			.then(() =>
			{
				// Check the callback counter for components to be loaded, if the page has no components resolve the promise right away.
				this._allComponentsLoaded = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

				return this._allComponentsLoaded;
			})
			.then(() => this.setScrollSections())
			.then(() => this._dataManager.pageLoader.transitionOut())
			.catch((result) =>
			{
				throw result;
			})
	}

	/**
	 * @protected
	 * @method handleResize
	 */
	protected handleResize(): void
	{
		Object.keys(this._scrollTrackerPoints).forEach((key, index) =>
		{
			const controller = this._components[key];
			const scrollTrackerPoint = this._scrollTrackerPoints[key];
			const element = controller.element;
			const parent = <AbstractBlockComponentController<any, any>|ContentPagePageController>controller.parent;
			const threshold = element.offsetHeight * controller.transitionInThreshold;
			const elementHeight = element.offsetHeight - threshold;

			scrollTrackerPoint.position = Math.round(parent.element.offsetTop + element.offsetTop + threshold);
			scrollTrackerPoint.height = elementHeight;
		})
	}

	/**
	 * @public
	 * @method removeComponentsFromScrollTracker
	 */
	public removeComponentsFromScrollTracker(components: {[id: string]: AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>}): void
	{
		Object.keys(components).forEach((key, index) =>
		{
			if(this._scrollTrackerPoints[key])
			{
				this._scrollTrackerPoints[key].removeEventListener(ScrollTrackerEvent.ENTER_VIEW, this._handleScrollSectionInViewListener);
				this._scrollTrackerPoints[key].removeEventListener(ScrollTrackerEvent.LEAVE_VIEW, this._handleScrollSectionOutViewListener);

				this._scrollTracker.removePoint(this._scrollTrackerPoints[key]);

				if(this._scrollTrackerPoints[key])
				{
					this._scrollTrackerPoints[key] = null;
					delete this._scrollTrackerPoints[key];
				}

				if(this._components[key])
				{
					delete this._components[key];
				}
			}
			else
			{
				console.warn('Component does not exist, so unable to remove it');
			}
		});
	}


	/**
	 * @public
	 * @method addScrollTrackerPoints
	 */
	public addComponentsToScrollTracker(components: {[id: string]: AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>}): void
	{
		Object.keys(components).forEach((key, index) =>
		{
			const controller = this._components[key];

			if(!this._scrollTrackerPoints[key])
			{
				const element = controller.element;
				const threshold = window.innerHeight * controller.transitionInThreshold;
				const parent = <AbstractBlockComponentController<any, any>|ContentPagePageController>controller.parent;
				const yPosition = Math.round(parent.element.offsetTop + element.offsetTop + threshold);
				const elementHeight = element.offsetHeight - threshold;
				const scrollTrackerPoint = this._scrollTracker.addPoint(yPosition, elementHeight);

				// Bind the event
				this._handleScrollSectionInViewListener = this.handleScrollSectionInView.bind(this, key);
				this._handleScrollSectionOutViewListener = this.handleScrollSectionOutView.bind(this, key);

				scrollTrackerPoint.addEventListener(ScrollTrackerEvent.ENTER_VIEW, this._handleScrollSectionInViewListener);
				scrollTrackerPoint.addEventListener(ScrollTrackerEvent.LEAVE_VIEW, this._handleScrollSectionOutViewListener);

				// Store the reference
				this._scrollTrackerPoints[key] = scrollTrackerPoint;

				if(scrollTrackerPoint.isInBounds)
				{
					this.handleScrollSectionInView(key);
				}
			}
		});
	}

	/**
	 * @private
	 * @method setScrollSections
	 * @description method to add the scroll sections to the scroll tracker to start playing animations
	 */
	private setScrollSections(): void
	{
		this.addComponentsToScrollTracker(this._components);
	};

	/**
	 * @private
	 * @method handleScrollSectionInView
	 */
	private handleScrollSectionInView(id: string): void
	{
		// Set isInView boolean on the component
		this._components[id].isInView = true;
		this._components[id].startAnimations();

		// Avoid multiple transition in triggers
		if(!this._components[id].transitionInStarted && !this._components[id].disableTransitionIn)
		{
			this._components[id].transitionIn();
		}
	};

	/**
	 * @private
	 * @method handleScrollSectionOutView
	 */
	private handleScrollSectionOutView(id: string): void
	{
		// Set isInView boolean on the component
		this._components[id].isInView = false;
		this._components[id].stopAnimations();
	}

	/**
	 * @private
	 * @method getPageLayotu
	 * @description method to retrieve the page layout including all the components and the data
	 */
	private getPageLayout(): Promise<any>
	{
		let route = Gaia.api.getRoute();

		// If the route is a popup, strip the route for fetching the page content.
		if(Gaia.api.getPage(Gaia.api.getCurrentBranch()).type == PageType.POPUP)
		{
			// TODO:  The default route should be returned by the backend? Check with the backend guys
			route = Routes.HOME;
		}
		else
		{
			// We want to fetch this from the backend!
			route = route === '/' ? Routes.HOME : route;
		}

		return DataManager.getInstance().settingsModel.pageLayoutModel.getLayout(
			StringUtils.startsWith(route, '/') ? route.substr(1) : route
		).then((result: IPageLayout) =>
		{
			this.viewModel.pageLayout(result.blocks);

			// Set the header theme if available
			this._dataManager.headerTheme(result.headerTheme);

			// Set the page title
			document.title = result.pageTitle;

		}).catch((result) =>
		{
			console.error('[DefaultContentPageController]  went wrong binding the page, either the route (' + Gaia.api.getRoute() + ') does not exist or there is a knockout binding error. Result: ', result);
		});
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		if(this.callbackCounter)
		{
			this.callbackCounter.destruct();
			this.callbackCounter = null;
		}

		if(this._scrollTracker)
		{
			this._scrollTracker.destruct();
			this._scrollTracker = null;
		}

		this._dataManager = null;
		this._beforeTransitionIn = null;
		this._allComponentsLoaded = null;
		this._components = null;
		this._scrollTrackerPoints = null;
		this._handleScrollSectionInViewListener = null;

		super.destruct();
	}
}

export default ContentPagePageController;