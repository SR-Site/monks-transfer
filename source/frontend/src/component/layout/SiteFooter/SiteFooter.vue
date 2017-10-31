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
				<a class="copy copy-06 link-primary" href="#">Spectrumreach@spectrum.com</a>
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
						target: phoneNumber,
					}"
					:class="$style.button"
					ref="buttonLink"/>
			</div>
			<ul :class="$style.middle">
				<li :class="$style.middleLink">
					<a href="#" class="copy copy-06 link-chevron">
						<span class="chevron"></span>
						<span class="label">Charter</span>
					</a>
				</li>
				<li :class="$style.middleLink">
					<a href="#" class="copy copy-06 link-chevron">
						<span class="chevron"></span>
						<span class="label">Charter</span>
					</a>
				</li>
				<li :class="$style.middleLink">
					<a href="#" class="copy copy-06 link-chevron">
						<span class="chevron"></span>
						<span class="label">Charter</span>
					</a>
				</li>
				<li :class="$style.middleLink">
					<a href="#" class="copy copy-06 link-chevron">
						<span class="chevron"></span>
						<span class="label">Charter</span>
					</a>
				</li>
			</ul>
			<div :class="$style.bottom">
				<p class="copy copy-06">Charter Communications &copy;2017</p>
				<ul :class="$style.legalLinks">
					<li :class="$style.legalLink">
						<a class="copy copy-06 link-secondary" href="#">Privacy Policy</a>
					</li>
					<li :class="$style.legalLink">
						<a class="copy copy-06 link-secondary" href="#">Spectrum Reach Terms</a>
					</li>
					<li :class="$style.legalLink">
						<a class="copy copy-06 link-secondary" href="#">Careers</a>
					</li>
				</ul>
			</div>
		</div>
		<span :class="$style.secondaryArrow"></span>
	</footer>
</template>
