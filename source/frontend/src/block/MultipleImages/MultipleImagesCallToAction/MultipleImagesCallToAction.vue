<style src="./MultipleImagesCallToAction.scss" module lang="scss"></style>
<script src="./MultipleImagesCallToAction.js"></script>

<template>
	<div :class="$style.multipleImagesCallToAction">
		<h2 class="heading heading-05" v-html="data.heading" :class="$style.heading"></h2>
		<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy"></p>
		<ButtonPrimary
			componentId="ButtonPrimary"
			v-if="data.link"
			v-track="{
				[TrackingProvider.GOOGLE_ANALYTICS]: {
					category: 'multipleImages',
					action: 'click',
					label: data.link.title
				}
			}"
			:title="data.link.title"
			:label="data.link.label"
			:type="ButtonType.LINK"
			:theme="Theme.DARK"
			:link="{
				type: BackendLinkTypeMap[data.link.type],
				target: data.link.target,
			}"/>
	</div>
</template>
