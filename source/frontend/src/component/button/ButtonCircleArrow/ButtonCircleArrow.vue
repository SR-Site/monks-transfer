<style src="./ButtonCircleArrow.scss" module lang="scss"></style>
<script src="./ButtonCircleArrow.js"></script>

<template>
	<button @click="handleClick"
	        :class="[$style.button, $style[`align-${(arrowPosition)}`]]"
	        class="button">
		<Icon :class="$style.icon" :name="`circle-arrow-${direction}`"/>
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
