import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import Direction from 'data/enum/Direction';
import Alignment from 'data/enum/Alignment';
import ButtonCircleArrowTransitionController from './ButtonCircleArrowTransitionController';

export default {
	name: 'ButtonCircleArrow',
	extends: AbstractButtonComponent,
	props: {
		direction: VueTypes.oneOf([Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]),
		arrowPosition: VueTypes.oneOf([Alignment.LEFT, Alignment.RIGHT, Alignment.CENTER]),
	},
	computed: {
		mappedDirection() {
			return Direction[this.direction].toLowerCase();
		},
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonCircleArrowTransitionController(this);
			this.isReady();
		},
	},
};
