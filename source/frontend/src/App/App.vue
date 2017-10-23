<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
	<div :class="$style.appWrapper">
		<SiteHeader componentId="Header" />
		<router-view></router-view>
		<SiteFooter componentId="Footer" />
		<Notification componentId="Notification" />
	</div>
</template>
