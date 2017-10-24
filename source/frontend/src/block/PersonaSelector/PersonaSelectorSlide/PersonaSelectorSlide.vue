<style src="./PersonaSelectorSlide.scss" module lang="scss"></style>
<script src="./PersonaSelectorSlide.js"></script>

<template>
	<div :class="$style.personaSelectorSlide" class="abs-center">
		<h2 :class="$style.heading" class="heading heading-04" v-html="data.heading" ref="heading"></h2>
		<div :class="$style.copy" class="copy copy-01" v-html="truncate(data.paragraph, 150)" ref="copy"></div>
		<ButtonPrimary
			componentId="ButtonPrimary"
			v-if="data.link"
			:title="data.link.title"
			:label="data.link.label"
			:type="ButtonType.LINK"
			:theme="Theme.DARK"
			:link="{
						type: linkTypeMap[data.link.type],
						target: data.link.target,
					}"
			:class="$style.button"/>
	</div>
</template>
