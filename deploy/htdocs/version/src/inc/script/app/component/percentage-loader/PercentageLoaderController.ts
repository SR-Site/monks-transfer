import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import PercentageLoaderTransitionController from 'app/component/percentage-loader/PercentageLoaderTransitionController';
import IPercentageLoaderOptions from 'app/component/percentage-loader/IPercentageLoaderOptions';
import PercentageLoaderViewModel from 'app/component/percentage-loader/PercentageLoaderViewModel';

import Log from "lib/temple/util/Log";

class PercentageLoaderController extends AbstractTransitionComponentController<PercentageLoaderViewModel, IPercentageLoaderOptions, PercentageLoaderTransitionController>
{
	private static _DURATION: number = 0.7;

	private _animatedLine: HTMLElement;
	private _fullPercentage: number = 100;
	private _amountInfo: HTMLElement;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.PercentageLoader');


	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new PercentageLoaderTransitionController(this.element, this);

		this._animatedLine = <HTMLElement>this.element.querySelector('.animated-line');
		this._amountInfo = <HTMLElement>this.element.querySelector('.amount-info');

		this.animateLine(this.options.percentage);
	}

	/**
	 * @Public
	 * @method animateLine
	 * @param amount
	 */
	public animateLine(amount: number): void
	{
		let percentage = (amount / this._fullPercentage) * 100;

		this.viewModel.amount(amount);

		TweenLite.fromTo(this._animatedLine, PercentageLoaderController._DURATION,
			{
				opacity: 0
			},
			{
				opacity: 1,
				ease: Power2.easeIn
			});

		TweenLite.fromTo(this._animatedLine, PercentageLoaderController._DURATION,
			{
				drawSVG: '0%'
			},
			{
				drawSVG: '0 ' + percentage + '%',
				ease: Power2.easeIn
			});

	}


	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._animatedLine = null;
		this._amountInfo = null;
		this._fullPercentage = null;

		// always call this last
		super.destruct();
	}
}

export default PercentageLoaderController;
