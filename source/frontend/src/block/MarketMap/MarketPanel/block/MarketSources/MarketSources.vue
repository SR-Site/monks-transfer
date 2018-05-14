<style src="./MarketSources.scss" module lang="scss">
</style>
<script src="./MarketSources.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<ul :class="['credits', $style.credits]" v-if="data.credits">
			<li v-for="(credit, index) in data.credits">
				<i>{{credit.source}}</i>
			</li>
		</ul>
	</div>
</template>
