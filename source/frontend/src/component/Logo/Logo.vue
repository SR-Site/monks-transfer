<style src="./Logo.scss" module lang="scss"></style>
<script src="./Logo.js"></script>

<template>
	<Icon name="logo" :class="[$style.wrapper, $style[ClassNameHelper.parseTheme(theme)]]"/>
</template>

