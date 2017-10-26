<style src="./VideoPlayerControls.scss" module lang="scss"></style>
<script src="./VideoPlayerControls.js"></script>

<template>
	<div :class="[$style.videoPlayerControls, {[$style.isActive]: isActive}]">
		<button
			class="button"
			@click="handlePlayClick"
			:class="[$style.videoPlayerButton, $style.buttonPlay, {[$style.isPlaying]: isPlaying}]">
			<Icon
				name="video-play"
				class="abs-center"
				:class="[$style.icon, $style.playIcon]"
				v-if="!isPlaying"
			/>
			<Icon
				name="video-pause"
				class="abs-center"
				:class="[$style.icon, $style.pauseIcon]"
				v-if="isPlaying"
			/>
		</button>

		<div :class="$style.progress">
			<div :class="$style.progressBarWrapper" class="abs-center" ref="bounds">
				<div :class="$style.progress" :style="{width: `${progress * 100}%`}"></div>
				<div :class="$style.knob" ref="knob"></div>
			</div>
		</div>

		<button
			class="button"
			@click="handleMuteClick"
			v-if="displayMuteButton"
			:class="[$style.videoPlayerButton, $style.buttonMute, {[$style.isMuted]: isMuted}]">
			<Icon
				name="video-volume-off"
				class="abs-center"
				:class="[$style.icon, $style.volumeOffIcon]"
				v-if="!isMuted"
			/>
			<Icon
				name="video-volume-on"
				class="abs-center"
				:class="[$style.icon, $style.volumeOnIcon]"
				v-if="isMuted"
			/>
		</button>
	</div>
</template>
