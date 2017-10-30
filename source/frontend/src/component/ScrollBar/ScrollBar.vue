<style src="./ScrollBar.scss" module lang="scss"></style>
<script src="./ScrollBar.js"></script>

<template>
	<div :class="$style.scrollBar">
		<div :class="$style.knob" class="js-draggable-element">
			<span></span>
		</div>
	</div>
</template>
