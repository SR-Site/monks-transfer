<style src="./ContactButton.scss" module lang="scss"></style>
<script src="./ContactButton.js"></script>

<template>
	<button :class="['button', $style.button]" @click="handleClick">
		<span :class="$style.label">
			{{ label }}
			<Icon name="arrow-right" :class="$style.icon"/>
		</span>
	</button>
</template>
