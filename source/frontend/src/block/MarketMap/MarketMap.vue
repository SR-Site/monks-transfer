<style src="./MarketMap.scss" module lang="scss"></style>
<script src="./MarketMap.js"></script>

<template>
	<div :class="$style.marketMap">
		<div class="abs-fill" :class="$style.wrapper">
			<div class="map-box abs-fill" id="js-map"></div>
			<ZoomActions :class="$style.zoomActions" componentId="MarketZoomActions" @zoomIn="handleZoomIn" @zoomOut="handleZoomOut"/>
			<InfoBox :data="data.info" componentId="InfoBox"/>
			<ContactButton :label="data.contactButton" componentId="ContactButton" :class="$style.contactButton"/>
		</div>
		<Spinner componentId="Spinner"/>
	</div>
</template>
