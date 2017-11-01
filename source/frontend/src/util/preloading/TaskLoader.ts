import EventDispatcher from 'seng-event/lib/EventDispatcher';
import AbstractLoadTask from 'util/preloading/task/AbstractLoadTask';
import sequentialPromises from 'util/sequentialPromises';
import TaskLoaderEvent from 'util/preloading/event/TaskLoaderEvent';
import { IAbstractTransitionComponent } from 'vue-transition-component';

/**
 * @class TaskLoader
 * @description The TaskLoader class is used to manage loading of tasks, it dispatches the task progress so it's
 * super simple to create pre-loaders which load all sorts of files.
 *
 * Example usage:
 * ```typescript
 *    const taskLoader = new TaskLoader();
 *    taskLoader.addEventListener(TaskLoaderEvent.START, event => console.log('start pre-loading)
 *    taskLoader.addEventListener(TaskLoaderEvent.UPDATE, event => console.log(`update, ${event.data.progress}`)
 *    taskLoader.addEventListener(TaskLoaderEvent.COMPLETE, event => console.log('done pre-loading)
 *
 *    taskLoader.loadTasks([
 *      new LoadVideoTask({
 *          assets: 'path/to/video.mp4',
 *          onAssetLoaded: result => console.log(result),
 *      }),
 *      new LoadImageTask({
 *          assets: [
 *              'path/to/image1.jpg',
 *              'path/to/image2.jpg',
 *              'path/to/image3.jpg',
 *              'path/to/image4.jpg',
 *              'path/to/image5.jpg',
 *              'path/to/image6.jpg',
 *          ],
 *          batchSize: 5,
 *          onAssetLoaded: result => console.log(result),
 *      }),
 *    ]).then(() => console.log('all assets have been loaded'));
 * ```
 */
export default class TaskLoader extends EventDispatcher {
	/**
	 * @private
	 * @type {number}
	 * @description Number of task in the task loader, this is used for calculating the total progress
	 */
	private _taskCount: number = 0;
	/**
	 * @private
	 * @type {number}
	 * @description The number of completed tasks in the task loader, this is used for calculating the total progress
	 */
	private _tasksCompleted: number = 0;
	/**
	 * @private
	 * @type {number}
	 * @description The progress for the currently running task, this is used for calculating the total progress
	 */
	private _taskProgress: number = 0;

	/**
	 * @public
	 * @description Attach a pre loader to the task loader
	 */
	public preLoader: IAbstractTransitionComponent;

	/**
	 * @description This method starts loading the tasks. You can provide an array of tasks which all contain their
	 * own progress. When everything is done it will resolve the returned promise.
	 * @param {Array<LoadTask≤any≥>} tasks
	 * @returns {Promise<bool>}
	 */
	public loadTasks(tasks: Array<AbstractLoadTask<any>>): Promise<boolean> {
		// Reset the data
		this.reset();

		this._taskCount = tasks.length;

		// Notify about the starting
		this.dispatchEvent(new TaskLoaderEvent(TaskLoaderEvent.START));

		return sequentialPromises(
			tasks.map(task => () =>
				task.load(progress => {
					// Update the task progress
					this._taskProgress = progress;
					// Notify about the progress
					this.update();
				}),
			),
			progress => {
				// Reset the task progress
				this._taskProgress = 0;
				// Up the completed task counter
				this._tasksCompleted = this._taskCount * progress;
				// Notify about the completion
				this.update();
			},
		)
			.then(() => tasks.forEach(task => task.dispose()))
			.then(() => this.dispatchEvent(new TaskLoaderEvent(TaskLoaderEvent.COMPLETE)));
	}

	/**
	 * @private
	 * @get progress
	 * @description get the total progress of the load action
	 * @returns {number}
	 */
	private get progress(): number {
		return this._taskCount > 0 ? (this._tasksCompleted + this._taskProgress) / this._taskCount : 0;
	}

	/**
	 * @private
	 * @method reset
	 * @description Reset the task loader to allow another batch of tasks to run through it.
	 */
	private reset(): void {
		this._taskCount = 0;
		this._tasksCompleted = 0;
		this._taskProgress = 0;

		this.update();
	}

	/**
	 * @private
	 * @method update
	 * @param {number} progress
	 * @description Dispatches the current progress for the task loader
	 */
	private update(): void {
		this.dispatchEvent(
			new TaskLoaderEvent(TaskLoaderEvent.UPDATE, {
				progress: this.progress,
			}),
		);
	}

	/**
	 * @public
	 * @method dispose
	 * @description Dispose the task loader and clean all the variables
	 */
	public dispose(): void {
		this._taskCount = null;
		this._tasksCompleted = null;
		this._taskProgress = null;
	}
}