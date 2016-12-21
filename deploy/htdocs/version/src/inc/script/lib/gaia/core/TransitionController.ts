import IPageAsset from "../interface/IPageAsset";
import PageEvent from "../event/PageEvent";

import EventDispatcher from "lib/temple/event/EventDispatcher";
import IEvent from "lib/temple/event/IEvent";
import Log from "../../temple/util/Log";

/**
 * @namespace gaia.core
 * @class TransitionController
 * @extend temple.events.EventDispatcher
 */
class TransitionController extends EventDispatcher
{
	private _isInterrupted:boolean;
	private _transitionState:number;
	private _outPages:Array<IPageAsset>;
	private _inPages:Array<IPageAsset>;
	private _tPages:Array<IPageAsset>;
	private _tIndex:number;
	private _outIndex:number;
	private _inIndex:number;

	// flags
	private _transitionAll = true;
	private _transitionInAll = false;
	private _transitionOutAll = false;

	// delegates
	private _onTransitionCompleteDelegate:(event:IEvent) => void;
	private _onTransitionInCompleteDelegate:(event:IEvent) => void;
	private _onTransitionOutCompleteDelegate:(event:IEvent) => void;

	private _log:Log = new Log('lib.gaia.core.TransitionController');

	constructor()
	{
		super();

		this._onTransitionCompleteDelegate = <(event:IEvent) => void>this.onTransitionComplete.bind(this);
		this._onTransitionInCompleteDelegate = <(event:IEvent) => void>this.onTransitionInComplete.bind(this);
		this._onTransitionOutCompleteDelegate = <(event:IEvent) => void>this.onTransitionOutComplete.bind(this)
	}

	public isTransitioning():boolean
	{
		return this._transitionState > 0;
	}

	public isTransitioningIn():boolean
	{
		return (this._transitionState & TransitionState.IN) == TransitionState.IN;
	}

	public isTransitioningOut():boolean
	{
		return (this._transitionState & TransitionState.OUT) == TransitionState.OUT;
	}

	public transitionOut(pages:Array<IPageAsset>):void
	{
		this._log.log('transitionOut', pages);

		this._transitionState |= TransitionState.OUT;
		this._isInterrupted = false;

		if (pages.length > 0)
		{
			this._outPages = pages;
			this._outIndex = pages.length - 1;

			if (this._transitionOutAll)
			{
				for (var i = this._outIndex; i > -1; --i)
				{
					this.pageOut(this._outPages[i]);
				}
			}
			else
			{
				this.pageOut();
			}
		}
		else
		{
			this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_OUT_COMPLETE));
		}
	}

	public transition(oldPages:Array<IPageAsset>, newPages:Array<IPageAsset>):void
	{
		this._log.log('transition', oldPages, newPages);

		this._isInterrupted = false;
		this._tPages = oldPages.concat(newPages);

		if (this._tPages.length > 0)
		{
			this._tIndex = 0;

			if (this._transitionAll)
			{
				for (var i = 0; i < this._tPages.length; ++i)
				{
					this.pageTransition(this._tPages[i]);
				}
			}
			else
			{
				this.pageTransition();
			}
		}
		else
		{
			this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_COMPLETE));
		}
	}

	public transitionIn(pages:Array<IPageAsset>):void
	{
		this._log.log('transitionIn', pages);

		this._transitionState |= TransitionState.IN;
		this._isInterrupted = false;

		if (pages.length > 0)
		{
			this._inPages = pages;
			this._inIndex = 0;

			if (this._transitionInAll)
			{
				for (var i = 0; i < this._inPages.length; ++i)
				{
					this.pageIn(this._inPages[i]);
				}
			}
			else
			{
				this.pageIn();
			}
		}
		else
		{
			this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_IN_COMPLETE));
		}
	}

	private onTransitionOutComplete(event:PageEvent):void
	{
		event.target.removeEventListener(PageEvent.TRANSITION_OUT_COMPLETE, this._onTransitionOutCompleteDelegate);

		this._log.log('transitionOutComplete', (<any>event.target).getBranch());

		if (!this._isInterrupted && (--this._outIndex > -1))
		{
			if (!this._transitionOutAll)
			{
				this.pageOut();
			}
			return;
		}
		this._transitionState &= ~TransitionState.OUT;
		this._isInterrupted = false;
		this.dispatchEvent(event);
	}

	private onTransitionInComplete(event:PageEvent):void
	{
		this._log.log('transitionInComplete', (<IPageAsset>event.target).getBranch());

		event.target.removeEventListener(PageEvent.TRANSITION_IN_COMPLETE, this._onTransitionInCompleteDelegate);

		if (!this._isInterrupted && (++this._inIndex < this._inPages.length))
		{
			if (!this._transitionInAll)
			{
				this.pageIn();
			}
			return;
		}
		this._transitionState &= ~TransitionState.IN;
		this._isInterrupted = false;
		this.dispatchEvent(event);
	}

	private onTransitionComplete(event:PageEvent):void
	{
		this._log.log('transitionComplete', (<IPageAsset>event.target).getBranch());

		event.target.removeEventListener(PageEvent.TRANSITION_COMPLETE, this._onTransitionCompleteDelegate);

		if (!this._isInterrupted && (++this._tIndex < this._tPages.length))
		{
			if (!this._transitionAll)
			{
				this.pageTransition();
			}
			return;
		}
		this._isInterrupted = false;
		this.dispatchEvent(event);
	}

	private pageOut(page?:IPageAsset):void
	{
		this._log.log('transitionOut', this._outPages[this._outIndex].getBranch());

		if (typeof(page) == 'undefined')
		{
			page = this._outPages[this._outIndex];
		}

		page.addEventListener(PageEvent.TRANSITION_OUT_COMPLETE, this._onTransitionOutCompleteDelegate);
		page.transitionOut();
	}

	private pageIn(page?:IPageAsset):void
	{
		this._log.log('transitionIn', this._inPages[this._inIndex].getBranch());

		if (typeof(page) == 'undefined')
		{
			page = this._inPages[this._inIndex];
		}

		page.addEventListener(PageEvent.TRANSITION_IN_COMPLETE, this._onTransitionInCompleteDelegate);
		page.transitionIn();
	}

	private pageTransition(page?:IPageAsset):void
	{
		this._log.log('transition', this._tPages[this._tIndex].getBranch());

		if (typeof(page) == 'undefined')
		{
			page = this._tPages[this._tIndex];
		}

		page.addEventListener(PageEvent.TRANSITION_COMPLETE, this._onTransitionCompleteDelegate);
		this.dispatchEvent(new PageEvent(PageEvent.BEFORE_INIT, page));
		page.initPage();
		page.transition();
	}

	public interrupt():void
	{
		if (!this._isInterrupted && this._transitionState > 0)
		{
			this._isInterrupted = true;
			var transitionDirection:String = "";
			if (this._transitionState & TransitionState.IN)
			{
				transitionDirection = "IN";
			}
			if (this._transitionState & TransitionState.OUT)
			{
				transitionDirection += "OUT";
			}
			if (transitionDirection == "INOUT")
			{
				transitionDirection = "CROSS";
			}

			this._log.warn('transition interrupt', transitionDirection);
		}
	}
}

export default TransitionController;

enum TransitionState
{
	IN = 1 << 0,
	OUT = 1 << 1
}