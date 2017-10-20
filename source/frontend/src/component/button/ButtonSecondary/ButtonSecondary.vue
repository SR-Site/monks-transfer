<style src="./ButtonSecondary.scss" module lang="scss"></style>
<script src="./ButtonSecondary.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:class="[$style.button, { [$style[`theme-${theme}`]]: theme !== void 0 }]">
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
