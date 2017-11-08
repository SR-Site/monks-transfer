<style src="./ButtonTertiary.scss" module lang="scss"></style>
<script src="./ButtonTertiary.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:class="[$style.buttonTertiary, $style[ClassNameHelper.parseTheme(theme)]]"
		:title="title">
		<span>{{label}}!</span>
	</button>
</template>
