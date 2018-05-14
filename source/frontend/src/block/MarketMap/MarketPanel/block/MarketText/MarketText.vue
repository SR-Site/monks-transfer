<style src="./MarketText.scss" module lang="scss">
</style>
<script src="./MarketText.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-07', $style.text]" v-if="data.text">{{data.text}}</h3>
	</div>
</template>
