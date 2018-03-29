<style src="./MarketComparePercentages.scss" module lang="scss"></style>
<script src="./MarketComparePercentages.js"></script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<div :class="$style.percentages">
			<div :class="$style.percentage" v-for="(percentage, index) in data.percentages">
				<div :class="$style.label">{{percentage.label}}</div>
				<div :class="$style.value">
					<div :class="$style.progressBar">
						<div
							v-for="(percentage, index) in percentage.values"
							:data-value="`${percentage.value}%`"
							:key="index"
							:class="[$style.item, $style.progressPiece]"
							:style="{width: `${percentage.value}%`}">
						</div>
					</div>
					<ul :class="$style.legend">
						<li
							v-for="(percentage, index) in percentage.values"
							:key="index"
							:class="[$style.item, $style.legendItem]">
							{{percentage.label}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
