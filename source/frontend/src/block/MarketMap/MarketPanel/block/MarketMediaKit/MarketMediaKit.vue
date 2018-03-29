<style src="./MarketMediaKit.scss" module lang="scss">
</style>
<script src="./MarketMediaKit.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<ButtonQuinary
			@click="handleButtonClick"
			:theme="Theme.SECONDARY"
			componentId="ButtonQuaternary"
			:class="$style.button"
			:title="data.label"
			:label="data.label"
			:type="ButtonType.ACTION"
			:solid="true"
		/>
	</div>
</template>
