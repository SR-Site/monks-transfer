<style src="./GlossaryA.scss" module lang="scss"></style>
<script src="./GlossaryA.js"></script>

<template>
	<div :class="$style.glossaryA">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<h2 class="heading heading-03" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
				<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
				<div :class="$style.items">
					<GlossaryItem
						@isReady="handleGlossaryReady"
						v-for="(item, index) in data.items"
						:componentId="`GlossaryItem${index}`"
						:key="index"
						:data="item"
					/>
				</div>
				<ButtonPrimary
					componentId="ButtonPrimary"
					v-track="{
						[TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'button',
							action: 'click',
							label: data.link.title
						}
					}"
					:class="$style.button"
					:title="data.link.title"
					:label="data.link.label"
					:type="ButtonType.LINK"
					:solid="true"
					:theme="Theme.LIGHT"
					:link="{
						type: BackendLinkTypeMap[data.link.type],
						target: data.link.target,
					}"  />
			</div>
		</div>
	</div>
</template>
