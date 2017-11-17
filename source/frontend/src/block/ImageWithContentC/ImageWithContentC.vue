<style src="./ImageWithContentC.scss" module lang="scss"></style>
<script src="./ImageWithContentC.js"></script>

<template>
	<div :class="[$style.imageWithContentC, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div class="overrule-overlap">
			<figure :class="$style.image">
				<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
			</figure>
			<div :class="$style.description">
				<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
				<div :class="$style.content">
					<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"
					    v-show="data.heading"></h2>
					<p class="copy copy-01" :class="$style.copy" v-html="truncatedParagraph" ref="copy"></p>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-if="data.link"
						v-track="{
						[TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'ImageWithContentC',
							action: 'click',
							label: data.link.title
						}
					}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.LIGHT"
						:link="{
						type: BackendLinkTypeMap[data.link.type],
						target: data.link.target,
					}"/>
				</div>
			</div>
		</div>
	</div>
</template>
