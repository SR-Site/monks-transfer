<style src="./ButtonQuinary.scss" module lang="scss"></style>
<script src="./ButtonQuinary.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:title="title"
		:class="[$style.buttonQuinary, $style[ClassNameHelper.parseTheme(theme)]]">
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
