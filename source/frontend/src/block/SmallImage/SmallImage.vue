<style src="./SmallImage.scss" module lang="scss"></style>
<script src="./SmallImage.js"></script>

<template>
	<div :class="[$style.smallImage, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<ResponsiveImage :image="data.image"/>
	</div>
</template>
