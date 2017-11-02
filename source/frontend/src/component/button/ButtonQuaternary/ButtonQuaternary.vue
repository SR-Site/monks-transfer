<style src="./ButtonQuaternary.scss" module lang="scss"></style>
<script src="./ButtonQuaternary.js"></script>

<template>
	<button
		@click="handleClick"
		:title="title"
		class="button"
		:class="[$style.buttonQuaternary, $style[ClassNameHelper.parseTheme(theme)]]">
		<span ref="stripe" :class="$style.stripe"></span>
		<span ref="label" :class="$style.label" v-html="label"></span>
	</button>
</template>
