import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockNetworkOverviewController from "./BlockNetworkOverviewController";

class BlockNetworkOverviewTransitionController extends AbstractTransitionController<BlockNetworkOverviewController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const networkWraper = Array.prototype.slice.call(this.element.querySelectorAll('.network-row'));

		networkWraper.forEach((network, rowIndex) =>
		{
			const networkLogos = Array.prototype.slice.call(network.querySelectorAll('.network-logo'));

			networkLogos.forEach((networkLogo, index) =>
			{
				this.transitionInTimeline.from(networkLogo, 0.6, {
					opacity: 0,
					clearProps: "opacity"
				}, index * 0.2 + (rowIndex * 0.4))
			})
		})
	}
}

export default BlockNetworkOverviewTransitionController;
