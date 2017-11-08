<style src="./MarketSearchResult.scss" module lang="scss"></style>
<script src="./MarketSearchResult.js"></script>

<template>
	<div :class="[$style.marketSearchResult, {[$style.isActive]: isActive}]">
		<div :class="$style.scrollWrapper" ref="scrollWrapper" class="scroll-wrapper" :style="{ height }">
			<div :class="$style.scrollContent" data-scroll-content class="scroll-content">
				<div :class="$style.panelInnerContent" data-content-inner>
					<button
						class="button"
						v-for="(result, index) in clonedResults"
						v-html="`${result.city}, ${result.statePostalCode}`"
						:key="index"
						:class="$style.resultButton"
						@click="handleSelectMarket(result)">

					</button>
					<p
						v-if="clonedResults.length === 0"
						v-html="notFoundMessage"
						:class="$style.noResultMessage"
						class="copy copy-03"></p>
				</div>
			</div>
			<div class="scroll-bar" data-scroll-bar>
				<div class="knob" data-scroll-knob></div>
			</div>
		</div>
	</div>
</template>
