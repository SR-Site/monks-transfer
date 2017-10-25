<style src="./VideoPlayer.scss" module lang="scss"></style>
<script src="./VideoPlayer.js"></script>

<template>
	<div :class="$style.videoPlayer" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
		<VideoPlayerControls
			@setPlay="handleSetPlay"
			@setMute="handleSetMute"
			@seek="handleSeek"
			:class="$style.controls"
			:isMuted="isMuted"
			:isPlaying="isPlaying"
			:progress="progress"
			componentId="VideoPlayerControls" />
	</div>
</template>
