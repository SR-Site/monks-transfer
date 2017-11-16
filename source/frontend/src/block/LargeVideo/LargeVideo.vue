<style src="./LargeVideo.scss" module lang="scss"></style>
<script src="./LargeVideo.js"></script>

<template>
	<div :class="$style.largeVideo">
		<figure :class="$style.image">
			<ResponsiveImage :image="data.poster" class="abs-fill fit-cover"/>
			<ButtonCirclePlay
				componentId="ButtonCirclePlay"
				title="play"
				:type="ButtonType.ACTION"
				:theme="Theme.LIGHT"
				:isPlaying="false"
				class="abs-center"
				ref="playButton"
				@click="handleVideoClick"/>
		</figure>
	</div>
</template>
