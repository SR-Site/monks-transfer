import NativeEventListener from '../../util/event/NativeEventListener';
import getRouter from '../../router';

export default {
	bind: (element, binding) => {
		element.setAttribute('href', binding.value.path);
		this.eventListener = new NativeEventListener(element, 'click', event => {
			// Cancel the click
			event.preventDefault();
			// Update the route
			getRouter().push({
				path: binding.value.path,
			});
		});
	},
	unbind: () => {
		console.log(this);
		this.eventListener.dispose();
		this.eventListener = null;
	},
};
