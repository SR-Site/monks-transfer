<style src="./ButtonPrimary.scss" module lang="scss"></style>
<script src="./ButtonPrimary.js"></script>

<template>
	<button
		@click="handleClick"
		@mouseover="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		class="button"
		:title="title"
		:class="[$style.buttonPrimary, $style[ThemeHelper.parse(theme)]]">
		<span ref="label" :class="$style.label">{{label}}</span>
		<svg width="100%" height="100%" class="abs-fill" preserveAspectRatio="none">
			<rect
				:class="$style.backgroundStroke"
				ref="backgroundStroke"
				x="0.5"
				y="0.5"
				vector-effect="non-scaling-stroke">
			</rect>
			<rect
				:class="$style.hoverStroke"
				ref="hoverStroke"
				x="0.5"
				y="0.5"
				vector-effect="non-scaling-stroke">
			</rect>
		</svg>
		<span ref="stripe" :class="$style.stripe"></span>
	</button>
</template>
