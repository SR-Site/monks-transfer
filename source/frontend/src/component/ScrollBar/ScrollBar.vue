<style src="./ScrollBar.scss" module lang="scss"></style>
<script src="./ScrollBar.js"></script>

<template>
	<div :class="[$style.scrollBar, $style[ClassNameHelper.parseTheme(theme)]]">
		<div :class="$style.scrollBarInner">
			<div :class="$style.knob" class="js-draggable-element" ref="knob">
				<Icon name="arrows" :class="$style.icon" class="abs-center"></Icon>
			</div>
		</div>
	</div>
</template>
