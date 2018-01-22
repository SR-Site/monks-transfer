<style src="./ServiceButton.scss" module lang="scss"></style>
<script src="./ServiceButton.js"></script>

<template>
	<button class="button" :class="$style.serviceButton" @click="handleClick">
		<h3 class="heading heading-07" :class="$style.heading">{{ data.heading }}</h3>
		<p class="copy copy-02" :class="$style.subHeading">{{data.subHeading}}</p>
		<a class="copy copy-01" :class="$style.cta" v-html="data.cta"></a>
	</button>
</template>
