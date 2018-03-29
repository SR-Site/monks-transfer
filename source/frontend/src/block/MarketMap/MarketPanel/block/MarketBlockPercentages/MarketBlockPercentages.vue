<style src="./MarketBlockPercentages.scss" module lang="scss"></style>
<script src="./MarketBlockPercentages.js"></script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-07', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<div :class="$style.percentages">
			<div :class="$style.percentage" v-for="(percentage, index) in data.percentages">
				<div :class="$style.percentageBar">
					<div
						:class="$style.bar"
						:data-value="`${percentage.value}%`"
						:style="{height: `${percentage.value}%`}">
					</div>
				</div>
				<div :class="$style.label">{{percentage.label}}</div>
			</div>
		</div>
	</div>
</template>
