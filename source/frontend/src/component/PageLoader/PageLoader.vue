<style src="./PageLoader.scss" module lang="scss"></style>
<script src="./PageLoader.js"></script>

<template>
	<div :class="$style.pageLoader">
		<div class="abs-center" :class="$style.spinner">
			<img :src="`${$versionRoot}image/loading.gif`" alt="Loading">
		</div>
	</div>
</template>
