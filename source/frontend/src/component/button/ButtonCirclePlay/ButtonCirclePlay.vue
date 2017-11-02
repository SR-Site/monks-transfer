<style src="./ButtonCirclePlay.scss" module lang="scss"></style>
<script src="./ButtonCirclePlay.js"></script>

<template>
	<button
		@click="handleClick"
		class="button"
        :class="[
        	$style.buttonCirclePlay,
			$style[ClassNameHelper.parseSize(size)]
		]"
	        :title="title">
		<Icon :class="$style.icon" name="circle-play" v-if="!isPlaying"/>
		<Icon :class="$style.icon" name="circle-pause" v-if="isPlaying"/>
	</button>
</template>
