<style src="./ButtonMenu.scss" module lang="scss"></style>
<script src="./ButtonMenu.js"></script>

<template>
	<button @click="handleClick" :class="$style.button" class="button" :title="title">
		<span :class="$style.label">{{label}}</span>
		<span :class="[$style.icon, {'is-active': isActive}]" class="hamburger hamburger--spin js-hamburger">
		<div class="hamburger-box">
			<div class="hamburger-inner"></div>
		</div>
	</span>
	</button>
</template>
