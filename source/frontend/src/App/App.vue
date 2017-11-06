<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>
<template>
	<div :class="$style.appWrapper">
		<div :class="[$style.siteWrapper, {[$style.isActive]: pageLoaderReady}]">
			<SiteHeader componentId="Header" @toggleMenu="handleToggleMenu" :menuActive="menuActive"/>
			<router-view @beforePageChange="closeMenu"></router-view>
			<ButtonStartAdvertising
				@click="handleStartAdvertisingClick"
				v-show="!hideContactButton"
				componentId="ButtonStartAdvertising"
				:title="$t('global.cta.start_advertising_today')"
				:label="$t('global.cta.start_advertising_today')"
				:type="ButtonType.ACTION"
			/>
			<SlideoutPanel componentId="SlideoutPanel" />
			<SiteMenu componentId="Menu" :menuActive="menuActive"/>
			<SiteFooter componentId="Footer" />
			<VideoOverlay componentId="VideoOverlay" />
			<Notification componentId="Notification" />
		</div>
		<PageLoader componentId="PageLoader" @isReady="handlePageLoaderReady"/>
	</div>
</template>


