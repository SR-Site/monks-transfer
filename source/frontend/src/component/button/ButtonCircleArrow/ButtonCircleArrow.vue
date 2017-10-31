<style src="./ButtonCircleArrow.scss" module lang="scss"></style>
<script src="./ButtonCircleArrow.js"></script>

<template>
	<button @click="handleClick"
	        :class="[$style.buttonCircleArrow, $style[`align-${(mappedArrowPosition)}`]]"
	        class="button">
		<Icon :class="$style.icon" :name="`circle-arrow-${mappedDirection}`"/>
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
