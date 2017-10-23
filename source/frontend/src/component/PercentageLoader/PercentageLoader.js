import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import { TweenLite, Power2 } from 'gsap';
import PercentageLoaderTransitionController from './PercentageLoaderTransitionController';

export default {
	name: 'PercentageLoader',
	extends: AbstractTransitionComponent,
	props: {
		value: VueTypes.number.isRequired,
		total: VueTypes.number.isRequired,
		borderType: VueTypes.number.isRequired,
	},
	data() {
		return {
			duration: 0.7,
			label: '',
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new PercentageLoaderTransitionController(this);
			this.isReady();

			this.animateLine(this.value, this.total);
		},
		animateLine(value, total) {
			const targetValue = isFinite(value) ? value : 100; // eslint-disable-line
			const percentage = Math.round(targetValue / total * 100);

			TweenLite.fromTo(
				this.$refs.animatedLine,
				this.duration,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					ease: Power2.easeIn,
				},
			);

			TweenLite.fromTo(
				this.$refs.animatedLine,
				this.duration,
				{
					drawSVG: '0%',
				},
				{
					drawSVG: `0 ${percentage}%`,
					ease: Power2.easeIn,
				},
			);

			this.label = isFinite(value) ? `${percentage}%` : value; // eslint-disable-line
		},
	},
};
