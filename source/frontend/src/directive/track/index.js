import NativeEventListener from '../../util/event/NativeEventListener';
import { getValue } from 'util/injector';
import { TRACKING_MANAGER } from '../../data/Injectables';

// Object for storing all the link listeners
const listeners = {};

export default {
	bind(element, binding) {
		// Set the href
		element.setAttribute('href', binding.value.path);
		// Store the listener based on the element node
		listeners[element] = new NativeEventListener(element, 'click', event => {
			// Cancel the click
			event.preventDefault();
			// Update the route
			getValue(TRACKING_MANAGER).trackEvent(binding.value);
		});
	},
	unbind(element) {
		// Remove the listener
		listeners[element].dispose();
		// delete the reference
		delete listeners[element];
	},
};
