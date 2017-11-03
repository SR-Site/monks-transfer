import NativeEventListener from '../../util/event/NativeEventListener';
import getRouter from '../../router';
import LinkType from '../../data/enum/link/BackendLinkType';

const namespace = 'LinkDirective';

export default {
	bind(element, binding) {
		// Set the href
		element.setAttribute('href', binding.value.path);
		// Store the listener based on the element node
		element[namespace] = new NativeEventListener(element, 'click', event => {
			// Cancel the click
			event.preventDefault();

			switch (binding.value.type) {
				case LinkType.INTERNAL:
					getRouter().push(
						{
							path: binding.value.path,
						},
					);
					break;
				case LinkType.EXTERNAL:
					window.location.href = binding.value.path;
					break;
				case LinkType.EXTERNAL_BLANK:
					window.open(binding.value.path);
					break;
				default:
					console.error('Unknown link type', binding.value);
					break;
			}
		});
	},
	unbind(element) {
		// Remove the listener
		element[namespace].dispose();
		// delete the reference
		delete element[namespace];
	},
};
