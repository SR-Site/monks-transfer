<style src="./MarketList.scss" module lang="scss"></style>
<script src="./MarketList.js"></script>

<template>
	<div :class="[$style.marketList, {[$style.isOpen]: mobileSidePanelOpen}]">
		<div :class="$style.scrollWrapper" ref="scrollWrapper" class="scroll-wrapper">
			<div :class="$style.scrollContent" data-scroll-content class="scroll-content">
				<div :class="$style.panelInnerContent" data-content-inner>
					<ul :class="$style.filterList">
						<li
							@click="handleSelectMarket(market)"
							class="copy copy-03"
							v-for="(market, index) in markets"
							v-html="`${market.city}, ${market.statePostalCode}`"
							:key="index"
							:class="[$style.filterListItem, {[$style.isActive]: market === selectedMarket}]">
						</li>
					</ul>
				</div>
			</div>
			<div class="scroll-bar" data-scroll-bar :class="$style.scrollBar">
				<div class="knob" data-scroll-knob></div>
			</div>
		</div>
	</div>
</template>
