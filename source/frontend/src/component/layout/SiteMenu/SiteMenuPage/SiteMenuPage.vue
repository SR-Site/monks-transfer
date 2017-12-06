<style src="./SiteMenuPage.scss" module lang="scss"></style>
<script src="./SiteMenuPage.js"></script>

<template>
	<ul :class="[$style.siteMenuPage, $style[status]]">
		<li v-if="data.section !== 'root'">
			<button
				@click="back"
				class="button"
				:class="[$style.button, $style.backButton]" >
				<span :class="$style.centerContent">
					<Icon name="arrow-left" :class="$style.icon"></Icon>
					<span :class="$style.label" v-html="$t('global.cta.back')"></span>
				</span>
			</button>
		</li>
		<li
			v-for="(link, index) in data.links"
			:class="[
				$style.menuItem,
				{
					[$style.offset]: index !== 0 && data.section !== 'root'
				}
			]">
			<button
				@click="selectSection(link.section)"
				class="button"
				:class="[$style.button, $style.hoverButton, $style.actionButton]"
				v-if="link.section" >
				<span :class="$style.centerContent">
					<span :class="$style.label" v-html="link.section"></span>
					<Icon name="arrow-right" :class="$style.icon"></Icon>
				</span>
			</button>
			<a
				class="button"
				:class="[$style.button, $style.hoverButton]"
				v-if="!link.section"
				v-link="{ path: link.target, type: link.type }" >
				<span :class="$style.centerContent">
					<span :class="$style.label" v-html="link.label"></span>
				</span>
			</a>
		</li>
	</ul>
</template>

