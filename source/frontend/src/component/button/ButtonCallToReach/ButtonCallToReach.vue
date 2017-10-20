<style src="./ButtonCallToReach.scss" module lang="scss"></style>
<script src="./ButtonCallToReach.js"></script>

<template>
	<button @click="handleClick" class="button" :class="$style.button" :title="title">
		<Icon :class="$style.icon" :name="icon" />
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
