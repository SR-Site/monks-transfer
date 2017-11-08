<style src="./SuccessStoryHighlight.scss" module lang="scss"></style>
<script src="./SuccessStoryHighlight.js"></script>

<template>
	<div :class="$style.successStoryHighlight">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<figure :class="$style.image" ref="image">
					<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
					<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
					<h3 class="heading heading-03" :class="$style.subHeading" v-html="data.subHeading"></h3>
				</figure>
				<div :class="$style.description">
					<h2 class="heading heading-07" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
					<p class="copy copy-03" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'successStoryHighlight',
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
			</div>
		</div>
	</div>
</template>
