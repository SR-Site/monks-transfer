<style src="./GlossaryBanner.scss" module lang="scss"></style>
<script src="./GlossaryBanner.js"></script>

<template>
	<div :class="$style.glossaryBanner">
		<div class="site-frame">
			<div class="overrule-overlap">
				<div :class="$style.content">
					<figure :class="$style.image">
						<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
						<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
					</figure>
					<div class="abs-center" :class="$style.description">
						<h2 class="heading heading-02" :class="$style.heading" ref="heading" v-html="data.heading"></h2>
						<div :class="$style.bottom">
							<p class="copy copy-01" :class="$style.copy" ref="copy" v-html="data.subHeading"></p>
							<ButtonPrimary
								componentId="ButtonPrimary"
								v-track="{
									[TrackingProvider.GOOGLE_ANALYTICS]: {
										category: 'glossaryBanner',
										action: 'click',
										label: data.link.title
									}
								}"
								:title="data.link.title"
								:label="data.link.label"
								:type="ButtonType.LINK"
								:theme="Theme.DARK"
								:class="$style.button"
								:solid="true"
								:link="{
									type: BackendLinkTypeMap[data.link.type],
									target: data.link.target,
								}"/>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
