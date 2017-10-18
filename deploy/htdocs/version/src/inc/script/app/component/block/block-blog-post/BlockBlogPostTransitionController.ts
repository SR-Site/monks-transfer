import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockBlogPostController from "./BlockBlogPostController";

class BlockBlogPostTransitionController extends AbstractTransitionController<BlockBlogPostController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const tags = Array.prototype.slice.call(this.element.querySelectorAll('.tags .component-button-tag'));

		this.transitionInTimeline.from(this.element.querySelector('.date'), 0.8,
			{ opacity: 0, y: 50, ease: Expo.easeOut }
		);

		this.transitionInTimeline.from(this.element.querySelector('.main-heading'), 0.8,
			{ opacity: 0, y: 50, ease: Expo.easeOut },
			"=-0.6"
		);


		tags.forEach((tag)=>{
			this.transitionInTimeline.from(tag, 0.8,
				{ opacity: 0, y: 50, ease: Expo.easeOut },
				"=-0.6"
			);
		});

		this.transitionInTimeline.from(this.element.querySelector('.blog-post-bar'), 0.8,
			{ opacity: 0, y: 50, ease: Expo.easeOut },
			"=-0.6"
		);


		this.transitionInTimeline.from(this.element.querySelector('.description'), 0.8,
			{ opacity: 0, y: 50, ease: Expo.easeOut },
			"=-0.6"
		);
	}
}

export default BlockBlogPostTransitionController;
