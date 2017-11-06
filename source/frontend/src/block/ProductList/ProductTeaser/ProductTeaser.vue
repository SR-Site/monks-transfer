<style src="./ProductTeaser.scss" module lang="scss"></style>
<script src="./ProductTeaser.js"></script>

<template>
	<article :class="$style.productTeaser">
		<figure>
			<ResponsiveImage :image="data.image" />
		</figure>
	</article>
</template>
