<style src="./MarketVideo.scss" module lang="scss">
</style>
<script src="./MarketVideo.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<div :class="$style.videoPlayer">
			<VideoPlayer componentId="VideoPlayer" class="abs-fill"/>
		</div>
	</div>
</template>
