<style src="./HeroTertiary.scss" module lang="scss"></style>
<script src="./HeroTertiary.js"></script>

<template>
	<div :class="$style.heroTertiary">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="fit-cover"
			:class="$style.mediaCrossFader"/>
	</div>
</template>
