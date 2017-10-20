<style src="./FreeText.scss" module lang="scss"></style>
<script src="./FreeText.js"></script>

<template>
	<div :class="$style.freeText" class="site-frame">
		<div :class="$style.htmlContent" class="overrule-overlap" v-html="data.html" ref="htmlContent"></div>
	</div>
</template>
