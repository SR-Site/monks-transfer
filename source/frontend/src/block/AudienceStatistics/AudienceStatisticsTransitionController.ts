import { AbstractTransitionController } from 'vue-transition-component';
import { Linear } from 'gsap';
import IAbstractTransitionComponent from 'vue-transition-component/lib/interface/IAbstractTransitionComponent';

class AudienceStatisticsTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{
				autoAlpha: 0,
			},
			{
				autoAlpha: 1,
				ease: Linear.easeNone,
			},
		);

		const statistic = <Array<IAbstractTransitionComponent>>this.viewModel.$refs.statistic;
		if (statistic) {
			statistic.forEach((program, index) => {
				this.transitionInTimeline.add(this.getSubTimeline(`AudienceStatisticTeaser${index}`), 1);
			});
		}

		this.transitionInTimeline.add(this.getSubTimeline('ScrollBar'), 1);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {}
}

export default AudienceStatisticsTransitionController;
