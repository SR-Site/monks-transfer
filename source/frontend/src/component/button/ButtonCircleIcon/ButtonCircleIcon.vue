<style src="./ButtonCircleIcon.scss" module lang="scss"></style>
<script src="./ButtonCircleIcon.js"></script>

<template>
	<button @click="handleClick"
	        :class="[
	        	$style.buttonCircleIcon,
	        	$style[(ClassNameHelper.parseAlignment(iconPosition))],
	        	$style[(ClassNameHelper.parseTheme(theme))]
            ]"
	        class="button">
		<Icon :class="$style.icon" :name="icon"/>
		<span :class="$style.label">{{label}}</span>
	</button>
</template>
