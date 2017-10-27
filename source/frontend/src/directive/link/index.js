import NativeEventListener from '../../util/event/NativeEventListener';
import getRouter from '../../router';

const namespace = 'LinkDirective';

export default {
	bind(element, binding) {
		// Set the href
		element.setAttribute('href', binding.value.path);
		// Store the listener based on the element node
		element[namespace] = new NativeEventListener(element, 'click', event => {
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
		element[namespace].dispose();
		// delete the reference
		delete element[namespace];
	},
};
