import { AbstractContentPageComponent } from 'vue-block-system';
import ContentPageTransitionController from './ContentPageTransitionController';
import { kebabCase } from 'lodash';

export default {
	name: 'ContentPage',
	extends: AbstractContentPageComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ContentPageTransitionController(this);
			this.isReady();
		},
		getBlockClassNames(blockData) {
			const classNames = ['block-component'];

			if (blockData.windowed) {
				classNames.push('is-windowed');
			}

			if (blockData.overlap) {
				classNames.push('overlap');
			}

			if (blockData.marginTop) {
				classNames.push(`margin-top-${blockData.marginTop}`);
			}

			return classNames.join(' ');
		},
	},
};
