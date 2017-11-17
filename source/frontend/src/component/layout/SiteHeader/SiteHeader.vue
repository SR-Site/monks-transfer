<style src="./SiteHeader.scss" module lang="scss"></style>
<script src="./SiteHeader.js"></script>

<template>
	<header
		:class="[
			$style.wrapper,
			{
				[$style.solidBackground]: solidHeader,
			},
		]">
		<h2 :class="$style.logo">
			<a v-link="{ path: `/${landingRoute}`, type: 0}">
				<Logo :theme="logoTheme"/>
			</a>
		</h2>
		<Breadcrumbs
			componentId="Breadcrumbs"
			v-show="breadcrumbs.length"
			:class="$style.breadcrumbs"
			:breadcrumbs="breadcrumbs"/>
		<div :class="$style.callToActions">
			<ButtonCallToReach
				componentId="ButtonCallToReach"
				icon="contact"
				:theme="callToReachTheme"
				:title="phoneNumber"
				:label="phoneNumber"
				:type="ButtonType.LINK"
				:link="{
					type: LinkType.EXTERNAL_BLANK,
					target: `tel:${phoneNumber}`,
				}"
				:class="[$style.button, $style.callToReach]"/>
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
				:isActive="menuActive"
				:class="$style.button"
				:title="$t('global.cta.menu')"
				:label="$t('global.cta.menu')"
				:type="ButtonType.ACTION"
			/>
		</div>
	</header>
</template>
