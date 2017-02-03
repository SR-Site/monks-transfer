import DefaultSlideoutComponentTransitionController from "../../DefaultSlideoutComponentTransitionController";
import ContactController from "./ContactController";

class ContactTransitionController extends DefaultSlideoutComponentTransitionController<ContactController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class if it's not overwritten it will use the default transition which is a fade
	 */
	protected setupTransitionInTimeline(): void
	{
		super.setupTransitionInTimeline();

		this.transitionInTimeline.add(this.getSubTimeline('.component-button-secondary'));
	}
}

export default ContactTransitionController;
