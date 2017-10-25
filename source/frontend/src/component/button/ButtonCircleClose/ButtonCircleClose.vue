<style src="./ButtonCircleClose.scss" module lang="scss"></style>
<script src="./ButtonCircleClose.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:class="[$style.buttonCircleClose, $style[ClassNameHelper.parseSize(Size.LARGE)]]">
		<Icon name="cross" :class="$style.icon"/>
	</button>
</template>
