<style src="./AudioPlayer.scss" module lang="scss"></style>
<script src="./AudioPlayer.js"></script>

<template>
	<div :class="$style.audioPlayer">
		<ButtonCirclePlay
			componentId="ButtonCirclePlay"
			:title="`play/pause`"
			:type="ButtonType.ACTION"
			:theme="Theme.DARK"
			:isPlaying="isPlaying"
			:class="$style.button"
			@click="handleClick"/>
		<div :class="$style.waveFormWrapper">
			<div :class="$style.waveForm" ref="waveForm">
				<div :class="$style.fallbackProgress" v-if="!hasWebAudioSupport">
					<span :class="$style.progress" :style="{width: `${progress * 100}%`}"></span>
				</div>
			</div>
		</div>
	</div>
</template>
