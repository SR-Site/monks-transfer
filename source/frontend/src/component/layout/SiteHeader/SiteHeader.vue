<style src="./SiteHeader.scss" module lang="scss"></style>
<script src="./SiteHeader.js"></script>

<template>
	<header :class="[$style.wrapper, {[$style['is-scrolled']]: scrolled}]">
		<h2 :class="$style.logo">
			<Logo :theme="scrolled ? Theme.DARK : Theme.LIGHT"/>
		</h2>
		<div :class="$style.callToActions">
			<ButtonCallToReach
				componentId="ButtonCallToReach"
				icon="contact"
				:theme="scrolled ? Theme.DARK : Theme.LIGHT"
				:title="phoneNumber"
				:label="phoneNumber"
				:type="ButtonType.LINK"
				:link="{
					type: LinkType.EXTERNAL_BLANK,
					target: phoneNumber,
				}"
				:class="$style.button"/>
			<ButtonHeader
				componentId="ButtonHeader"
				:class="$style.button"
				:title="$t('global.cta.customer_login')"
				:label="$t('global.cta.customer_login')"
				:type="ButtonType.LINK"
				:link="{
					type: LinkType.EXTERNAL_BLANK,
					target: 'https://spectrumreach.brandcdn.com',
				}"
			/>
			<ButtonMenu
				componentId="ButtonMenu"
				@click="handleMenuClick"
				:class="$style.button"
				:title="$t('global.cta.menu')"
				:label="$t('global.cta.menu')"
				:type="ButtonType.ACTION"
			/>
		</div>
	</header>
</template>
