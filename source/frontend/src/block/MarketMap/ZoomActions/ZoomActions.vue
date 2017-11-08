<style src="./ZoomActions.scss" module lang="scss"></style>
<script src="./ZoomActions.js"></script>

<template>
	<div :class="$style.zoomActions">
		<button class="button" :class="$style.zoomButton" @click="handleZoomIn">
			<Icon :class="$style.icon" name="plus"/>
		</button>
		<button class="button" :class="$style.zoomButton" @click="handleZoomOut">
			<Icon :class="$style.icon" name="minus"/>
		</button>
	</div>
</template>
