<style src="./HeroQuinary.scss" module lang="scss"></style>
<script src="./HeroQuinary.js"></script>

<template>
	<div :class="$style.heroQuinary">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="fit-cover"
			:class="$style.mediaCrossFader"/>
		<PrimaryTriangle componentId="PrimaryTriangle" :class="$style.primaryBackgroundTriangle"/>
		<figure v-if="data.image" :class="$style.image" ref="image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-contain"/>
		</figure>
		<div :class="[$style.content, {[$style.isLarge]: !data.image}]">
			<h3 class="heading heading-03" :class="$style.heading" v-html="data.heading" ref="heading"></h3>
			<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
			<ButtonQuinary
				componentId="ButtonQuinary"
				ref="button"
				v-if="data.link"
				v-track="{
					[TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'HeroQuinary',
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
				}"  />
		</div>
	</div>
</template>
