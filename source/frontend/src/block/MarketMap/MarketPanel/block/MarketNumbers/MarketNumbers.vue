<style src="./MarketNumbers.scss" module lang="scss">
</style>
<script src="./MarketNumbers.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<ul :class="$style.statistics">
			<li
				v-for="(statistic, index) in data.statistics"
				:class="$style.statistic"
				:key="index"
			>
				<span :class="$style.value">{{formatNumber(statistic.value)}}</span>
				<span :class="$style.label">{{statistic.label}}</span>
			</li>
		</ul>
	</div>
</template>
