<style src="./DownloadFileB.scss" module lang="scss"></style>
<script src="./DownloadFileB.js"></script>

<template>
	<div :class="$style.downloadFileB">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<figure :class="$style.image" ref="image">
					<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
				</figure>
				<div :class="$style.description">
					<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
					<p class="copy copy-01" :class="$style.copy" v-html="data.fileDescription"
					   ref="fileDescription"></p>
				</div>
				<ButtonQuinary
					componentId="ButtonQuinary"
					ref="button"
					v-track="{
						[TrackingProvider.GOOGLE_ANALYTICS]: {
							category: 'DownloadFileB',
							action: 'click',
							label: data.link.title
						}
					}"
					:title="data.link.title"
					:label="data.link.label"
					:type="ButtonType.LINK"
					:theme="Theme.DARK"
					:link="{
						type: BackendLinkTypeMap[data.link.type],
						target: data.link.target,
					}"  />
			</div>
		</div>
	</div>
</template>
