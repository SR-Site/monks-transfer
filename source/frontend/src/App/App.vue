<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>
<template>
	<div :class="$style.appWrapper">
		<div :class="[$style.siteWrapper, {[$style.isActive]: pageLoaderReady}]">
			<SiteHeader componentId="Header" />
			<router-view></router-view>
			<SiteFooter componentId="Footer" />
			<VideoOverlay componentId="VideoOverlay" />
			<Notification componentId="Notification" />
		</div>
		<PageLoader componentId="PageLoader" @isReady="handlePageLoaderReady"/>
	</div>
</template>


