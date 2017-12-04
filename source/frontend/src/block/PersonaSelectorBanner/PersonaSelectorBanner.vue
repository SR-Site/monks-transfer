<style src="./PersonaSelectorBanner.scss" module lang="scss"></style>
<script src="./PersonaSelectorBanner.js"></script>

<template>
	<div :class="$style.personaSelectorBanner">
		<div class="site-frame" :class="$style.content">
			<div :class="$style.media" ref="media">
				<figure :class="$style.image">
					<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
				</figure>
			</div>
			<div :class="$style.description">
				<div>
					<h2 class="heading heading-07" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
					<p class="copy copy-01" v-html="data.paragraph" ref="copy"></p>
				</div>
				<ul :class="$style.links" ref="links">
					<li v-for="(link, index) in data.links" :key="index" :class="$style.link">
						<a
							v-link="{path: link.target, type: link.type}"
							v-html="link.label"
							:title="link.title"
							class="copy copy-03 link-tertiary"></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
