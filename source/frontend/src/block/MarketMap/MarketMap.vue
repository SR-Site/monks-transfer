<style src="./MarketMap.scss" module lang="scss"></style>
<script src="./MarketMap.js"></script>

<template>
	<div :class="$style.marketMap">
		<div class="abs-fill" :class="$style.wrapper">
			<div class="map-box abs-fill" id="js-map"></div>
			<ZoomActions componentId="MarketZoomActions" @zoomIn="handleZoomIn" @zoomOut="handleZoomOut"/>
		</div>
		<div :class="$style.sidePanel">
			<MarketList
				@selectMarket="handleSelectMarket"
				componentId="MarketList"
				:markets="markets"
				:selectedMarket="selectedMarket"/>
			<ServiceButton @click="handleContactUs" componentId="ServiceButton" :data="data.service"/>
		</div>
		<MarketSearch
			@selectMarket="handleSelectMarket"
			@resetMarket="resetMarket"
			componentId="MarketSearch"
			:class="$style.marketSearch"
			:searchPlaceholder="data.searchPlaceholder"
			:searchLabel="data.searchLabel"
			:notFoundMessage="data.notFoundMessage"
			:markets="markets"
			:states="states"
			:selectedMarket="selectedMarket"/>
		<Spinner componentId="Spinner"/>
	</div>
</template>
