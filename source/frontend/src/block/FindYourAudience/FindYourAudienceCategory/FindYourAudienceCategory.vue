<style src="./FindYourAudienceCategory.scss" module lang="scss"></style>
<script src="./FindYourAudienceCategory.js"></script>

<template>
	<div :class="$style.findYourAudienceCategory">
		<header :class="$style.header">
			<div :class="$style.top">
				<h2 class="heading heading-02" v-html="data.heading" ref="heading" :class="$style.heading"></h2>
				<ButtonQuaternary
					componentId="ButtonQuaternary"
					v-if="data.link"
					v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'FindYourAudience',
								action: 'click',
								label: data.link.label
							}
						}"
					:title="data.link.title"
					:label="data.link.label"
					:type="ButtonType.LINK"
					:theme="Theme.DARK"
					:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"
					:class="$style.button"/>
			</div>

			<p class="copy copy-01" v-html="data.paragraph" ref="copy" :class="$style.copy"></p>
		</header>
		<div :class="$style.items">
			<AudienceTeaser
				v-for="(item, index) in data.items"
				@isReady="handleComponentReady"
				ref="audience"
				:debugLabel="$config.getVariable(VariableNames.DEBUG_LABEL_ENABLED)"
				:class="$style.item"
				:key="index"
				:data="getAudienceData(item)"
				:componentId="`AudienceTeaser.${index}`" />
		</div>
		<div :class="$style.callToActions">
			<ButtonCircleArrow
				@click="handleBackToTop"
				componentId="ButtonCircleArrow"
				:direction="Direction.UP"
				:arrowPosition="Alignment.CENTER"
				:size="Size.SMALL"
				:theme="Theme.DARK"
				:title="$t('global.cta.back_to_top')"
				:label="$t('global.cta.back_to_top')"
				:type="ButtonType.ACTION"
				ref="buttonLink"/>
		</div>
	</div>
</template>
