import NotificationController from "app/component/notification/NotificationController";
import NotificationState from "./enum/NotificationState";
import {INotificationOptions} from "./INotificationOptions";
import AbstractTransitionComponentViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

import ko = require('knockout');

class NotificationViewModel extends AbstractTransitionComponentViewModel<NotificationController, INotificationOptions>
{
	public NotificationState:Enum = NotificationState;

	public accepted:boolean = false;

	public state:KnockoutObservable<NotificationState> = ko.observable(NotificationState.ALERT);
	public title:KnockoutObservable<string> = ko.observable('Title');
	public message:KnockoutObservable<string> = ko.observable('Message');


	/**
	* @public 
	* @method handleDeclineClick
	*/
	public handleDeclineClick():void
	{
		this.accepted = false;
		this.controller.transitionOut();
	}

	/**
	 * @public
	 * @method handleCloseClick
	 */
	public handleCloseClick():void
	{
		this.accepted = undefined;  // we need to be able to distinguish between clicking yes, no and just closing the dialog
		this.controller.transitionOut();
	}

	/**
	 * @public
	 * @method handleAcceptClick
	 */
	public handleAcceptClick():void
	{
		this.accepted = true;
		this.controller.transitionOut();
	}

	/**
	 *	Overrides AbstractComponentViewModel.destruct()
	 */
	public destruct():void
	{
		this.accepted = null;
		this.state = null;
		this.title = null;
		this.message = null;

		// always call this last
		super.destruct();
	}
}

export default NotificationViewModel;