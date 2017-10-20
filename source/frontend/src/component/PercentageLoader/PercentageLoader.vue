<style src="./PercentageLoader.scss" module lang="scss"></style>
<script src="./PercentageLoader.js"></script>

<template>
	<div :class="[$style.percentageLoader, $style[`is-${borderType}`]]">
		<div :class="$style.svgHolder">
			<svg
				class="svg"
				viewBox="0 0 500 500"
				width="100%"
				height="100%"
				preserverAspectRatio='xMinYMin meet'>
				<circle
					ref="animatedLineTrack"
					:class="$style.animatedLineTrack"
					cx="250"
					cy="250"
					r="230"
					stroke="#31353b"
					stroke-width="4"
					fill="transparent"
					vector-effect="non-scaling-stroke"/>
				<!--ANIMATE LINE-->
				<circle
					:class="$style.animatedLine"
					ref="animatedLine"
					cx="250"
					cy="250"
					r="230"
					stroke="#47aa42"
					stroke-width="20"
					fill="transparent"
					transform="rotate(-90, 250, 250)"/>
			</svg>
		</div>
		<div :class="$style.amountInfo" v-html="label"></div>
	</div>
</template>
