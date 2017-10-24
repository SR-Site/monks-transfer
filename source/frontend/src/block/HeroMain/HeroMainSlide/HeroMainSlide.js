import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import HeroMainSlideTransitionController from './HeroMainSlideTransitionController';
import PropLink from '../../../data/prop-type/action/PropLink';
import PropStatistic from '../../../data/prop-type/hero-main/PropStatistic';
import PercentageLoader from '../../../component/PercentageLoader/PercentageLoader';
import PercentageLoaderBorderType from '../../../component/PercentageLoader/enum/BorderType';

export default {
	name: 'HeroMainSlide',
	extends: AbstractTransitionComponent,
	components: {
		PercentageLoader,
	},
	props: {
		heading: VueTypes.string.isRequired,
		paragraph: VueTypes.string.isRequired,
		link: VueTypes.shape(PropLink),
		statistics: VueTypes.shape(PropStatistic),
		slideCount: VueTypes.number.isRequired,
		hasStatistics: VueTypes.bool.isRequired,
	},
	beforeCreate() {
		this.PercentageLoaderBorderType = PercentageLoaderBorderType;
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new HeroMainSlideTransitionController(this);
			this.isReady();
		},
		handleNextClick() {
			this.$emit('next');
		},
	},
};
