<style src="./ButtonSecondary.scss" module lang="scss"></style>
<script src="./ButtonSecondary.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:title="title"
		:class="[$style.buttonSecondary, $style[ClassNameHelper.parseTheme(theme)]]">
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
