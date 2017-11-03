<style src="./HeroSecondary.scss" module lang="scss"></style>
<script src="./HeroSecondary.js"></script>

<template>
	<div :class="$style.heroSecondary">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="abs-fill"
			:class="$style.mediaCrossFader"/>
		<div :class="$style.slideContentWrapper" class="abs-fill">
			<PrimaryTriangle componentId="PrimaryTriangle" :class="$style.primaryBackgroundTriangle"/>
			<SecondaryTriangle componentId="SecondaryTriangle" :class="$style.secondaryBackgroundTriangle"/>
			<div :class="$style.slideContent">
				<h3
					:class="$style.subHeading"
					class="heading heading-07"
					v-if="data.subHeading"
					v-html="data.subHeading"
				    ref="subHeading"></h3>
				<h2
					:class="$style.heading"
					class="heading heading-02"
					ref="heading"
					v-html="data.heading"></h2>
				<p
					:class="$style.copy"
					class="copy copy-01"
					ref="copy"
					v-html="data.paragraph"
					v-show="data.paragraph"></p>
				<ButtonCircleArrow
					componentId="ButtonCircleArrow"
					v-if="data.link"
					v-track="{
						[TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'heroSecondary',
							action: 'click',
							label: `${data.heading}|${data.link.title}`,
						}
					}"
					:direction="Direction.RIGHT"
					:arrowPosition="Alignment.LEFT"
					:title="data.link.title"
					:label="data.link.title"
					:type="ButtonType.LINK"
					:class="$style.button"
					:link="{
						type: BackendLinkTypeMap[data.link.type],
						target: data.link.target,
					}"
					ref="buttonLink"/>
			</div>
		</div>
	</div>
</template>
