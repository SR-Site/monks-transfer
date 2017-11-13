<style src="./GlossaryItem.scss" module lang="scss"></style>
<script src="./GlossaryItem.js"></script>

<template>
	<div :class="[$style.glossaryItem, {[$style.isUnlocked]: unlocked}]">
		<figure :class="$style.image">
			<div :class="$style.badge">
				<svg
					class="abs-center"
					:class="$style.icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 27 32">
					<path
						ref="check"
						:class="$style.check"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M26.4 7.6c-.8-.8-2.1-.8-2.9 0L10.6 20.2l-7.2-7c-.8-.8-2.1-.8-2.9 0-.8.8-.8 2 0 2.8l8.6 8.4c.8.8 2.1.8 2.9 0l14.4-14c.8-.8.8-2.1 0-2.8z"/>
					<path
						ref="lock"
						d="M21.5 8c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 3.5 2.3 6.5 5.5 7.6L5.5 32h16L16 15.6c3.2-1.1 5.5-4.1 5.5-7.6z"/>
				</svg>
			</div>
		</figure>
		<div :class="$style.description">
			<h3 class="heading heading-05" v-html="data.label" :class="$style.itemHeading"></h3>
			<p class="copy copy-01" v-html="data.value" :class="$style.itemCopy"></p>
		</div>
	</div>
</template>
