<style src="./CoreProductMessage.scss" module lang="scss"></style>
<script src="./CoreProductMessage.js"></script>

<template>
	<div :class="$style.coreProductMessage">
		<div class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.heading" ref="header">
					<h2 class="heading heading-03" v-html="data.heading"></h2>
				</header>
				<ul :class="$style.messages">
					<li :class="$style.message" v-for="(message, index) in data.items" :key="index" ref="item">
						<span :class="$style.value" v-html="message.value"></span>
						<span :class="$style.label" v-html="message.label"></span>
						<p class="copy copy-01" v-html="message.paragraph"></p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
