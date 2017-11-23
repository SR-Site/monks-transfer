import { AbstractButtonComponent } from 'vue-block-system';
import VueTypes from 'vue-types';
import Direction from 'data/enum/Direction';
import Theme from 'data/enum/Theme';
import Alignment from 'data/enum/Alignment';
import Size from 'data/enum/Size';
import ButtonCircleArrowTransitionController from './ButtonCircleArrowTransitionController';

export default {
	name: 'ButtonCircleArrow',
	extends: AbstractButtonComponent,
	props: {
		theme: VueTypes.oneOf([Theme.LIGHT, Theme.DARK]).def(Theme.LIGHT),
		size: VueTypes.oneOf([Size.SMALL, Size.MEDIUM, Size.LARGE]).def(Size.MEDIUM),
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
