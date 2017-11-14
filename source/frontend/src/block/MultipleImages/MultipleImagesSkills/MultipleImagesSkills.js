import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import MultipleImagesSkillsData from './MultipleImagesSkillsData';
import MultipleImagesSkillsTransitionController from './MultipleImagesSkillsTransitionController';

export default {
	name: 'MultipleImagesSkills',
	extends: AbstractTransitionComponent,
	props: {
		data: VueTypes.shape(MultipleImagesSkillsData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MultipleImagesSkillsTransitionController(this);
			this.isReady();
		},
	},
};
