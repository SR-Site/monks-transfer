<style src="./VideoOverlay.scss" module lang="scss"></style>
<script src="./VideoOverlay.js"></script>

<template>
	<div :class="$style.videoOverlay">
		<div :class="$style.contentWrapper" ref="content">
			<VideoPlayer :class="$style.videoPlayer "componentId="VideoPlayer" class="abs-fill" />
			<ButtonCircleClose
				componentId="ButtonCircleClose"
				title="Close"
				:size="Size.LARGE"
				:type="ButtonType.ACTION"
				:class="$style.button"
				@click="close"/>
		</div>
	</div>
</template>
