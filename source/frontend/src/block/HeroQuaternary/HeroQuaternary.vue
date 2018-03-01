<style src="./HeroQuaternary.scss" module lang="scss"></style>
<script src="./HeroQuaternary.js"></script>

<template>
	<div :class="$style.heroQuaternary">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="fit-cover"
			:class="$style.mediaCrossFader"/>
		<PrimaryTriangle componentId="PrimaryTriangle" :class="$style.primaryBackgroundTriangle" v-if="data.triangle"/>
		<figure v-if="data.image" :class="$style.image" ref="image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-contain"/>
		</figure>
		<div :class="$style.content">
			<div :class="$style.subHeading" v-html="data.subHeading" ref="subHeading" v-if="data.subHeading"></div>
			<div :class="$style.heading" v-if="data.heading" v-html="data.heading" ref="heading"></div>
			<div class="copy" :class="$style.copy" v-if="data.paragraph" v-html="data.paragraph" ref="copy"></div>
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
