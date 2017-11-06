<style src="./DownloadFileA.scss" module lang="scss"></style>
<script src="./DownloadFileA.js"></script>

<template>
	<div :class="$style.downloadFileA">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
				<p class="copy copy-03" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
				<div :class="$style.bottom">
					<p class="copy copy-02" :class="$style.fileDescription" v-html="data.fileDescription"
					   ref="fileDescription"></p>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'downloadFileA',
								action: 'click',
								label: data.link.title
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.LIGHT"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"/>
				</div>
			</div>
		</div>
	</div>
</template>
