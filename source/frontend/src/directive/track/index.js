import { getValue } from 'util/injector';
import { TRACKING_MANAGER } from '../../data/Injectables';
import NativeEventListener from '../../util/event/NativeEventListener';

const namespace = 'TrackDirective';

export default {
	bind(element, binding) {
		// Store the listener based on the element node
		element[namespace] = new NativeEventListener(element, 'click', event => {
			// Cancel the click
			event.preventDefault();
			// Update the route
			getValue(TRACKING_MANAGER).trackEvent(binding.value);
		});
	},
	unbind(element) {
		// Remove the listener
		element[namespace].dispose();
		// delete the reference
		delete element[namespace];
	},
};
