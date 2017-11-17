<style src="./Breadcrumbs.scss" module lang="scss"></style>
<script src="./Breadcrumbs.js"></script>

<template>
	<ul :class="$style.breadcrumbs">
		<li :class="$style.breadcrumb" v-for="(link, index) in breadcrumbs" :key="index">
			<a
				:class="[$style.link, {[$style.isActive]: link.target === pageUrl}]"
				:title="link.title"
				v-link="{ path: link.target, type: link.type }"
				v-html="link.label"></a>
		</li>
	</ul>
</template>
