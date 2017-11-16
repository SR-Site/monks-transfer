<style src="./TripleContent.scss" module lang="scss"></style>
<script src="./TripleContent.js"></script>

<template>
	<div :class="$style.tripleContent">
		<div class="site-frame">
			<div class="overrule-overlap">
				<h2 class="heading heading-03" v-html="data.heading" ref="header"></h2>
				<div :class="$style.tripleContentItems">
					<div :class="$style.tripleContentItem" v-for="(item, index) in data.items" :key="index" ref="item">
						<figure v-if="item.image" :class="$style.image">
							<ResponsiveImage :image="item.image" class="abs-fill fit-cover"/>
						</figure>
						<h3 class="heading heading-05" v-html="item.heading" :class="$style.heading"></h3>
						<p class="copy copy-01" v-html="item.paragraph"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
