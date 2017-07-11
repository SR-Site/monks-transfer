import ContentPagePageViewModel from "app/page/content-page/ContentPagePageViewModel";
import CallbackCounter from "../../util/CallbackCounter";
import DefaultPageController from "../DefaultPageController";
import AbstractBlockComponentController from "../../component/block/AbstractBlockComponentController";
import ScrollTracker, {ScrollTrackerPoint, ScrollTrackerEvent} from "../../../lib/temple/util/ScrollTracker";
import DataManager from "../../data/DataManager";
import * as Gaia from "lib/gaia/api/Gaia";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import GaiaHistoryEvent from "../../../lib/gaia/event/GaiaHistoryEvent";
import CommonEvent from "../../../lib/temple/event/CommonEvent";
import ScrollUtils from "../../util/ScrollUtils";
import PageType from "../../../lib/gaia/interface/PageType";
import StringUtils from "../../../lib/temple/util/type/StringUtils";
import IPageLayout from "../../data/interface/layout/IPageLayout";

import ko = require("knockout");
import Promise = require("bluebird");
import {trackPage} from "../../util/Analytics";
import LinkHelper from "../../util/LinkHelper";

class ContentPagePageController extends DefaultPageController<ContentPagePageViewModel>
{
	private _startupPagePromise: Promise<any>;

	/**
	 * @property callbackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter: CallbackCounter;
	/**
	 * @property _currentRoute
	 * @type {string}
	 */
	private _currentRoute: string;
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
	private _components: { [id: string]: AbstractBlockComponentController<any, any, any> } = {};
	/**
	 * @property _scrollTracker
	 * @type {ScrollTracker}
	 */
	private _scrollTracker: ScrollTracker;
	/**
	 * @property _scrollTrackerPoints
	 * @type {Object}
	 */
	private _scrollTrackerPoints: { [id: string]: ScrollTrackerPoint } = {};
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
	 * @property handleScrollSectionBeyondViewListener
	 * @type {()=>void}
	 */
	private handleScrollSectionBeyondViewListener: () => void;
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

		this._currentRoute = Gaia.api.getRoute().split('#')[0];

		// listen to window resize for recalculating the scroll positions
		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 500, this)));
	}

	/**
	 * @public
	 * @method get activeBlock
	 * @returns {KnockoutObservable<AbstractBlockComponentController<any, any>>}
	 */
	public get activeBlock(): KnockoutObservable<AbstractBlockComponentController<any, any, any>>
	{
		return this.viewModel.activeBlock;
	}

	/**
	 * @public
	 * @method get components
	 * @returns {AbstractBlockComponentController<DefaultComponentViewModel<any, any>, any>[]}
	 */
	public get components(): Array<AbstractBlockComponentController<any, any, any>>
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
			JSON.stringify(this._currentDeeplink) != JSON.stringify(event.routeResult[0].deeplink) &&
			this._currentRoute != event.routeResult.route.split('#')[0]
		)
		{
			this._dataManager.pageLoader.transitionIn()
				.then(() =>
				{
					this._currentDeeplink = event.routeResult[0].deeplink;

					// Filter out the hash tags
					this._currentRoute = event.routeResult.route.split('#')[0];

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

					if(this._startupPagePromise && !this._startupPagePromise.isResolved())
					{
						// User tried to leave the page before the page was done, so we want to cancel it!
						this._startupPagePromise.cancel();
						this._startupPagePromise = null;
					}

					this._startupPagePromise = this.startupPage()
						.catch((result) =>
						{
							throw result;
						});

					this._startupPagePromise.isCancellable();
				});
		}
		else
		{
			this.scrollToComponentFromURL(1);
		}
	}

	/**
	 * @private
	 * @method scrollToComponentFromURL
	 */
	private scrollToComponentFromURL(duration: number = 0): void
	{
		const route: string = Gaia.api.getRoute();

		if(route.indexOf('#') > -1)
		{
			const scrollId: string = route.split('#')[1];
			const scrollToComponentElement: HTMLElement = <HTMLElement>this.element.querySelector(`[data-scroll-section="${scrollId}"]`);
			const headerHeight: number = (<HTMLElement>document.body.querySelector('.component-header')).offsetHeight;

			if(scrollToComponentElement)
			{
				ScrollUtils.scrollToPosition(
					$(scrollToComponentElement).offset().top - headerHeight,
					duration
				);
			}
		}

	}

	/**
	 * @public
	 * @method handleComponentReady
	 * @param controller
	 */
	public handleComponentReady(controller: AbstractBlockComponentController<any, any, any>): void
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
			.then(() => this.scrollToComponentFromURL())
			.then(() => this._dataManager.pageLoader.transitionOut())
			.then(() => window['hj']('stateChange', window.location.href))
			.catch((result) =>
			{
				throw result;
			});
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
			const parent = <
				AbstractBlockComponentController<any, any, any>
				| ContentPagePageController>controller.parent;
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
	public removeComponentsFromScrollTracker(components: { [id: string]: AbstractBlockComponentController<any, any, any> }): void
	{
		Object.keys(components).forEach((key, index) =>
		{
			if(this._scrollTrackerPoints[key])
			{
				this._scrollTrackerPoints[key].removeEventListener(ScrollTrackerEvent.ENTER_VIEW, this._handleScrollSectionInViewListener);
				this._scrollTrackerPoints[key].removeEventListener(ScrollTrackerEvent.LEAVE_VIEW, this._handleScrollSectionOutViewListener);
				this._scrollTrackerPoints[key].removeEventListener(ScrollTrackerEvent.SCROLLED_BEYOND, this.handleScrollSectionBeyondViewListener);

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
	public addComponentsToScrollTracker(components: { [id: string]: AbstractBlockComponentController<any, any, any> }): void
	{
		Object.keys(components).forEach((key, index) =>
		{
			const controller = this._components[key];

			if(!this._scrollTrackerPoints[key])
			{
				const element = controller.element;
				const threshold = window.innerHeight * controller.transitionInThreshold;
				const parent = <
					AbstractBlockComponentController<any, any, any>
					| ContentPagePageController>controller.parent;
				const yPosition = Math.round(parent.element.offsetTop + element.offsetTop + threshold);
				const elementHeight = element.offsetHeight - threshold;
				const scrollTrackerPoint = this._scrollTracker.addPoint(yPosition, elementHeight);

				// Bind the event
				this._handleScrollSectionInViewListener = this.handleScrollSectionInView.bind(this, key);
				this._handleScrollSectionOutViewListener = this.handleScrollSectionOutView.bind(this, key);
				this.handleScrollSectionBeyondViewListener = this.handleScrollSectionBeyondView.bind(this, key);

				scrollTrackerPoint.addEventListener(ScrollTrackerEvent.ENTER_VIEW, this._handleScrollSectionInViewListener);
				scrollTrackerPoint.addEventListener(ScrollTrackerEvent.LEAVE_VIEW, this._handleScrollSectionOutViewListener);
				scrollTrackerPoint.addEventListener(ScrollTrackerEvent.SCROLLED_BEYOND, this.handleScrollSectionBeyondViewListener);

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
		const component = this._components[id];

		// Set isInView boolean on the component
		component.isInView = true;
		component.startAnimations();

		this.handleScrollSectionBeyondView(id);
	};

	/**
	 * @private
	 * @method handleScrollSectionBeyondView
	 */
	private handleScrollSectionBeyondView(id: string): void
	{
		const component = this._components[id];

		// Avoid multiple transition in triggers
		if(
			!component.transitionInStarted && !component.disableTransitionIn && !component.transitionComplete
		)
		{
			component.transitionIn();
		}
	}

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
		// Filter out the hash tags
		let route = LinkHelper.getRoute();

		// Store the route for updating the header logo
		DataManager.getInstance().currentRoute(route);

		this.trackPageView();

		return DataManager.getInstance().settingsModel.pageLayoutModel.getLayout(route)
			.then((result: IPageLayout) =>
			{
				this.viewModel.pageLayout(result.blocks);

				// Set the header theme if available
				this._dataManager.headerTheme(result.headerTheme);

				// Set the header theme if available
				this._dataManager.hideContactButton(result.hideContactButton || false);

				// Set the page title
				document.title = result.pageTitle;

			})
			.then(() => trackPage('/' + route))
			.catch((result) =>
			{
				console.error('[DefaultContentPageController]  went wrong binding the page, either the route (' + Gaia.api.getRoute() + ') does not exist or there is a knockout binding error. Result: ', result);
			});
	}

	/**
	 * @private
	 * @method trackPageView
	 * @description Multiple 3rd party page views can be tracked here
	 */
	private trackPageView():void
	{
		// Facebook pixel code
		if(fbq) fbq('track', 'PageView');

		// Twitter pixel code
		if(twq) twq('track', 'PageView');
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

		this._currentDeeplink = null;
		this._currentRoute = null;
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