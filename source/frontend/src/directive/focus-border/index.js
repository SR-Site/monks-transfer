import FocusBorder from '../../util/FocusBorder';

const namespace = 'FocusBorderDirective';

export default {
	bind(element) {
		element[namespace] = new FocusBorder(element);
	},
	componentUpdated(element) {
		if (element[namespace]) {
			element[namespace].update(element.querySelector('input').value);
		}
	},
	unbind(element) {
		// Remove the listener
		element[namespace].dispose();
		// delete the reference
		delete element[namespace];
	},
};
