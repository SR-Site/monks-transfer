import NativeEventListener from '../../util/event/NativeEventListener';
import getRouter from '../../router';
// Object for storing all the link listeners
let listeners = {};

export default {
	bind(element, binding) {
		// Set the href
		element.setAttribute('href', binding.value.path);
		// Store the listener based on the element node
		listeners[element] = new NativeEventListener(element, 'click', event => {
			// Cancel the click
			event.preventDefault();
			// Update the route
			getRouter().push({
				path: binding.value.path,
			});
		});
	},
	unbind(element) {
		// Remove the listener
		listeners[element].dispose();
		// delete the reference
		delete listeners[element];
	},
};
