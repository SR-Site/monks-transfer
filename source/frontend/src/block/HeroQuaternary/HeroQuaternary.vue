<style src="./HeroQuaternary.scss" module lang="scss"></style>
<script src="./HeroQuaternary.js"></script>

<template>
	<div :class="$style.heroQuaternary">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="fit-cover"
			:class="$style.mediaCrossFader"/>
		<PrimaryTriangle componentId="PrimaryTriangle" :class="$style.primaryBackgroundTriangle"/>
		<figure v-if="data.image" :class="$style.image" ref="image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-contain"/>
		</figure>
		<div :class="$style.content">
			<h3 class="heading heading-07" :class="$style.subHeading" v-html="data.subHeading" ref="subHeading"></h3>
			<h3 class="heading heading-03" :class="$style.heading" v-html="data.heading" ref="heading"></h3>
			<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
			<ButtonCircleIcon
				v-if="data.link"
				componentId="ButtonCircleArrowLink"
				icon="circle-play"
				:theme="Theme.LIGHT"
				:iconPosition="Alignment.LEFT"
				:title="data.link.title"
				:label="data.link.label"
				:type="ButtonType.LINK"
				:link="{
					type: BackendLinkTypeMap[data.link.type],
					target: data.link.target,
				}"
				:class="$style.button"
				ref="button"/>
		</div>
	</div>
</template>
