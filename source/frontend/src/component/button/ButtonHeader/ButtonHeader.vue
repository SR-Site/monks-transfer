<style src="./ButtonHeader.scss" module lang="scss"></style>
<script src="./ButtonHeader.js"></script>

<template>
	<button @click="handleClick" class="button" :class="$style.button" :title="title">
		<span :class="$style.label">{{label}}</span>
		<span :class="$style.separator"></span>
	</button>
</template>
