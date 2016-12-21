import Promise = require("bluebird");
import AbstractTask from "./AbstractTask";

/**
 * A simple task for executing promises with {{#crossLink "temple.control.sequence.Sequence"}}{{/crossLink}}. The
 * first argument should be a function that returns a promise
 *
 * Usage:
 *
 *     new Sequence('StartUp', true)
 *         .add(new PromiseTask(this.getLoginStatus.execute.bind(this), false, argument1, argument2, ...));
 *
 * @namespace temple.control.sequence.task
 * @class PromiseTask
 * @module temple
 * @extends lib.temple.control.sequence.tasks.AbstractTask
 * @constructor
 * @param promiseMethod {Function} A function that returns a promise
 * @param [failOnCatch=true] {boolean} When set to true, the Task will fail when the Promise throws a catch, set to
 * false it will silently continue
 * @param [argument1] {any} Rest arguments that are passed to the method that returns the Promise
 * @param [argument2] {any}
 * @param [etc] {any}
 * @returns {temple.control.sequence.task.PromiseTask}
 */
class PromiseTask extends AbstractTask
{
	private _methodArgs:Array<any>;

	constructor(private _promiseMethod:(...args:Array<any>) => Promise<any>,
	            private _failOnCatch:boolean = true,
	            ..._methodArgs:Array<any>)
	{
		super();
		this._methodArgs = _methodArgs;
	}

	/**
	 * @inheritDoc
	 */
	public executeTaskHook():void
	{
		this._promiseMethod(...this._methodArgs)
			.then(() => this.done())
			.catch((err:Error) => {
				if (this._failOnCatch == true)
				{
					this.fail("PromiseTask failed: " + err.message);
					return;
				}

				this.done();
			});
	}
}

export default PromiseTask;