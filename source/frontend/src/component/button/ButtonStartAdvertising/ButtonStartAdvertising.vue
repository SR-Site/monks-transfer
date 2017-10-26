<style src="./ButtonStartAdvertising.scss" module lang="scss"></style>
<script src="./ButtonStartAdvertising.js"></script>

<template>
	<div :class="$style.startAdvertising">
		<span :class="$style.background"></span>
		<button @click="handleClick" :class="$style.button" class="button" :title="title">
			<Icon name="circle-arrow-right" :class="$style.icon" />
			<span :class="$style.label">{{ label }}</span>
		</button>
	</div>
</template>
