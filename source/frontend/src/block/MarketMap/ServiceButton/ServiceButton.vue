<style src="./ServiceButton.scss" module lang="scss"></style>
<script src="./ServiceButton.js"></script>

<template>
	<button class="button" :class="$style.serviceButton" @click="handleClick">
		<h3 class="heading heading-07" :class="$style.heading">
			<span v-html="data.heading"></span>
			<span :class="$style.subHeading" v-html="data.subHeading"></span>
		</h3>
		<a class="copy copy-01" :class="$style.cta" v-html="data.cta"></a>
	</button>
</template>
