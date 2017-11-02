<style src="./Spinner.scss" module lang="scss"></style>
<script src="./Spinner.js"></script>

<template>
	<div :class="$style.spinner">
		<img :class="$style.image" :src="`${$versionRoot}image/loading.gif`" alt="loading">
	</div>
</template>
