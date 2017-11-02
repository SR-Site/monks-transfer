<style src="./SiteFooter.scss" module lang="scss"></style>
<script src="./SiteFooter.js"></script>

<template>
	<footer :class="$style.siteFooter" class="site-footer">
		<div :class="$style.logo">
			<span :class="$style.logoArrow"></span>
			<Logo :class="$style.logoIcon" :theme="Theme.LIGHT"/>
		</div>
		<div :class="$style.content">
			<div :class="$style.top">
				<a
					:class="$style.email"
					class="copy copy-06 link-primary"
					:href="`mailto:${mailTo}`"
					target="_blank"
					v-html="email.emailAddress">
				</a>
				<ButtonCircleIcon
					componentId="ButtonCircleArrowLink"
					icon="contact"
					:theme="Theme.LIGHT"
					:iconPosition="Alignment.LEFT"
					:title="phoneNumber"
					:label="phoneNumber"
					:type="ButtonType.LINK"
					:link="{
						type: LinkType.EXTERNAL_BLANK,
						target: `tel:${phoneNumber}`,
					}"
					:class="$style.button"
					ref="buttonLink"/>
			</div>
			<ul :class="$style.middle">
				<li :class="$style.middleLink" v-for="(link, index) in footerData.mainLinks" :key="index">
					<a class="copy copy-06 link-chevron" v-link="{path: link.target, type: link.type}">
						<span class="chevron"></span>
						<span class="label" v-html="link.label"></span>
					</a>
				</li>
			</ul>
			<div :class="$style.bottom">
				<p :class="$style.copyright" class="copy copy-06" v-html="footerData.copyright"></p>
				<ul :class="$style.legalLinks">
					<li :class="$style.legalLink" v-for="(link, index) in footerData.secondaryLinks" :key="index">
						<a
							class="copy copy-06 link-secondary"
							:title="link.title"
							v-link="{
								path: link.target,
								type: link.type,
							}"
							v-html="link.label"></a>
					</li>
				</ul>
			</div>
		</div>
		<span :class="$style.secondaryArrow"></span>
	</footer>
</template>
