<style src="./Infographic.scss" module lang="scss"></style>
<script src="./Infographic.js"></script>

<template>
	<div :class="[$style.infographic, $style[ClassNameHelper.parseAlignment(data.alignment)]]" >
		<ResponsiveImage :image="data.backgroundImage" class="abs-fill fit-cover"/>
		<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
		<div class="abs-fill" :class="$style.absFill">
			<div class="site-frame" :class="$style.siteFrame">
				<div :class="$style.content">
					<div :class="$style.description">
						<h2 class="heading heading-03" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
						<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
					</div>
					<div :class="$style.callToActions">
						<ButtonPrimary
							componentId="ButtonPrimaryLink"
							v-if="data.primaryLink"
							v-track="{
								[TrackingProvider.GOOGLE_ANALYTICS]: {
									category: 'infographic',
									action: 'click',
									label: data.primaryLink.title
								}
							}"
							:solid="true"
							:class="$style.button"
							:title="data.primaryLink.title"
							:label="data.primaryLink.label"
							:type="ButtonType.LINK"
							:theme="Theme.LIGHT"
							:link="{
								type: BackendLinkTypeMap[data.primaryLink.type],
								target: data.primaryLink.target,
							}"  />
						<ButtonPrimary
							componentId="ButtonSecondaryLink"
							v-if="data.secondaryLink"
							v-track="{
								[TrackingProvider.GOOGLE_ANALYTICS]: {
									category: 'infographic',
									action: 'click',
									label: data.secondaryLink.title
								}
							}"
							:solid="true"
							:class="$style.button"
							:title="data.secondaryLink.title"
							:label="data.secondaryLink.label"
							:type="ButtonType.LINK"
							:theme="Theme.LIGHT"
							:link="{
								type: BackendLinkTypeMap[data.secondaryLink.type],
								target: data.secondaryLink.target,
							}"  />
					</div>
					<figure :class="$style.image" ref="image">
						<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>
