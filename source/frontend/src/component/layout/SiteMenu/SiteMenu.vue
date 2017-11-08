<style src="./SiteMenu.scss" module lang="scss"></style>
<script src="./SiteMenu.js"></script>

<template>
	<div :class="$style.menu">
		<div :class="$style.menuBackground" ref="menuBackground"></div>
		<nav :class="$style.menuContent" ref="menuContent">
			<SiteMenuPage
				v-for="(page, index) in pages"
				:key="index"
				:data="page"
				:history="history"
				:active="active"
				@back="handleBack"
				@selectSection="handleSelectSection" />
		</nav>
	</div>
</template>
