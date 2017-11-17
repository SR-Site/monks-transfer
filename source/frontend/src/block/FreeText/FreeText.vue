<style src="./FreeText.scss" module lang="scss"></style>
<script src="./FreeText.js"></script>

<template>
	<div :class="[
		$style.freeText,
		$style[ClassNameHelper.parseAlignment(data.alignment)],
	]">
		<div class="site-frame include-padding" :class="[{'is-small': data.small}]">
			<div :class="$style.htmlContent" class="overrule-overlap" v-html="data.html" ref="htmlContent"></div>
		</div>
	</div>
</template>
