<style src="./ServiceButton.scss" module lang="scss"></style>
<script src="./ServiceButton.js"></script>

<template>
	<button class="button" :class="$style.serviceButton" @click="handleClick">
		<h3 class="heading heading-09" :class="$style.contactHeading" v-html="data.heading"></h3>
		<p class="copy copy-02" :class="$style.contactOption" v-html="emailAddress"></p>
		<p class="copy copy-02" :class="$style.contactOption">
			<Icon :class="$style.contactIcon" name="contact"/>
			<span v-html="phoneNumber"></span>
		</p>
		<Icon :class="$style.arrowIcon" name="circle-arrow-right"/>
	</button>
</template>
