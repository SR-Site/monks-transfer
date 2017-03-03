import INotificationOptions from "app/component/notification/INotificationOptions";
import NotificationViewModel from "app/component/notification/NotificationViewModel";
import NotificationState from "./enum/NotificationState";
import Log from "../../../lib/temple/util/Log";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import KeyCode from "../../../lib/temple/util/key/KeyCode";
import NotificationTransitionController from "./NotificationTransitionController";
import LocaleManager from "../../../lib/temple/locale/LocaleManager";
import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import Promise = require("bluebird");
import AbstractTransitionController from "../../util/component-transition/AbstractTransitionController";

class NotificationController extends AbstractTransitionComponentController<NotificationViewModel, INotificationOptions, NotificationTransitionController>
{
	private _debug: Log = new Log('App.Component.Notification');
	private _transitionTimeline: TimelineLite;

	private _resultPromise: Promise<INotificationResult>;
	private _resolvePromise: (result: INotificationResult) => void;

	/**
	 *    Overrides AbstractComponentController.init()
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		// Set the default states after creating the timeline!
		this.element.style.visibility = 'visible';
		this.element.style.display = 'none';

		this.transitionController = new NotificationTransitionController(this.element, this);

		this.transitionController.addEventListener(
			AbstractTransitionController.TRANSITION_IN_START,
			this.handleTransitionInStart.bind(this)
		);

		this.transitionController.addEventListener(
			AbstractTransitionController.TRANSITION_OUT_COMPLETE,
			this.handleTransitionOutComplete.bind(this)
		);


		this.destructibles.add(new NativeEventListener(document.body, 'keyup', this.handleKeyUp));
	}

	/**
	 * @public
	 * @method showConfirm
	 * @param title
	 * @param message
	 * @returns {Promise<INotificationResult>}
	 */
	public showConfirm(title: string, message: string): Promise<INotificationResult>
	{
		return this.show(NotificationState.CONFIRM, title, message);
	}

	/**
	 * @public
	 * @method showAlert
	 * @param title
	 * @param message
	 * @returns {Promise<INotificationResult>}
	 */
	public showAlert(title: string, message: string): Promise<INotificationResult>
	{
		return this.show(NotificationState.ALERT, title, message);
	}

	/**
	 * @public
	 * @method showServerError
	 * @param errorCode
	 * @returns {Promise<INotificationResult>}
	 */
	public showServerError(errorCode: string): Promise<INotificationResult>
	{
		const localeManager = LocaleManager.getInstance();
		const titlePath: string = 'notification.alert.server_message.' + errorCode + '.heading';
		const paragraphPath: string = 'notification.alert.server_message.' + errorCode + '.paragraph';

		const title = localeManager.hasString(titlePath) ? localeManager.getString(titlePath) : localeManager.getString('notification.alert.something_went_wrong.heading');
		const paragraph = localeManager.hasString(paragraphPath) ? localeManager.getString(paragraphPath) : localeManager.getString('notification.alert.something_went_wrong.paragraph');

		return this.show(NotificationState.ALERT, title, paragraph)
	}

	/**
	 * @private
	 * @method show
	 * @param state
	 * @param title
	 * @param message
	 * @returns {Promise}
	 */
	private show(state: NotificationState, title: string, message: string): Promise<INotificationResult>
	{
		// Detect existing or not yet resolved promise
		if(this._resultPromise && !this._resultPromise.isResolved())
		{
			// Manually resolve it if we try to open a new notification before closing the other one
			this.viewModel.accepted = false;
			this.transitionOut();

			// Subscribe to the already existing promise, when it's resolved return the new show promise
			return this._resultPromise.then(() =>
			{
				return this.show(state, title, message);
			});
		}
		else
		{
			this._resultPromise = new Promise<INotificationResult>((resolve: (result: INotificationResult) => void) =>
			{
				this.viewModel.state(state);
				this.viewModel.title(title);
				this.viewModel.message(message);
				this._resolvePromise = resolve;

				this.transitionIn();
			});

			return this._resultPromise
		}
	}

	/**
	 * @private
	 * @method handleKeyPress
	 */
	private handleKeyUp = (event: KeyboardEvent): void =>
	{
		if(event.keyCode == KeyCode.ESCAPE && this._resultPromise && !this._resultPromise.isResolved())
		{
			// Manually resolve it if we press the escape key
			this.viewModel.accepted = false;

			this.transitionOut();
		}
	};


	/**
	 * @private
	 * @method handleTransitionOutComplete
	 */
	private handleTransitionOutComplete(): void
	{
		this.element.style.display = 'none';

		// Resolve the promise when the timeline was reversed!
		this._resolvePromise({
			accepted: this.viewModel.accepted
		});

		// Clear the resolve callback
		this._resolvePromise = null;
		this._resultPromise = null;
	}

	/**
	 * @private
	 * @method handleTransitionInStart
	 */
	private handleTransitionInStart(): void
	{
		this.element.style.display = 'block';
	}

	/**
	 *    Overrides AbstractComponentController.destruct()
	 */
	public destruct(): void
	{
		if(this.callbackCounter)
		{
			this.callbackCounter.destruct();
			this.callbackCounter = null;
		}

		this._resolvePromise = null;
		this._resultPromise = null;
		this._transitionTimeline = null;

		// always call this last
		super.destruct();
	}
}

export interface INotificationResult
{
	accepted: boolean
}

export default NotificationController;