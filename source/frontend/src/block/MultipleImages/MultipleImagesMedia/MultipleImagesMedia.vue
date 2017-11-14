<style src="./MultipleImagesMedia.scss" module lang="scss"></style>
<script src="./MultipleImagesMedia.js"></script>

<template>
	<div :class="$style.multipleImagesMedia">
		<figure :class="$style.image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
			<ButtonCirclePlay
				v-if="data.video"
				class="abs-center"
				componentId="ButtonCirclePlay"
				title="play"
				:type="ButtonType.ACTION"
				:theme="Theme.LIGHT"
				:isPlaying="false"
				@click="handleVideoClick"/>
		</figure>
		<div :class="$style.description">
			<h2 class="heading heading-06" v-html="data.heading" :class="$style.heading"></h2>
			<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy"></p>
		</div>
	</div>
</template>
