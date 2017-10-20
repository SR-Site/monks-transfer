<style src="./ButtonMenu.scss" module lang="scss"></style>
<script src="./ButtonMenu.js"></script>

<template>
	<button @click="handleClick" :class="$style.button" class="button" :title="title">
		<span :class="$style.label">{{label}}</span>
		<span :class="$style.icon" class="hamburger hamburger--spin js-hamburger"
		      data-bind="css: {'is-active': data.menuButtonActive()}">
		<div class="hamburger-box">
			<div class="hamburger-inner"></div>
		</div>
	</span>
	</button>
</template>
