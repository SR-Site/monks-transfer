import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ButtonTransitionController from './ButtonTransitionController';
import ButtonData from './ButtonData';
import Alignment from '../../data/enum/Alignment';

export default {
	name: 'Button',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(ButtonData).isRequired,
	},
	computed: {
		mappedLink() {
			const link = {
				type: this.linkTypeMap[this.data.link.type],
			};

			if (this.data.link.target) {
				link[target] = this.data.link.target;
			}

			return link;
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonTransitionController(this);
			this.isReady();
		},
	},
};
