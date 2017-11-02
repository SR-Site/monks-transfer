<style src="./ButtonTag.scss" module lang="scss"></style>
<script src="./ButtonTag.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
		:class="[$style.buttonTag, {[$style.isInactive]: isInactive}]"
		:title="title">
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
