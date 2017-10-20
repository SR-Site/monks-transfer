<style src="./MediaCrossFader.scss" module lang="scss"></style>
<script src="./MediaCrossFader.js"></script>

<template>
	<div :class="$style.wrapper">
		<span ref="gridSize" :class="$style.gridSize"></span>
		<canvas ref="canvas"></canvas>
	</div>
</template>
