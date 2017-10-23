<style src="./ImageCallToActions.scss" module lang="scss"></style>
<script src="./ImageCallToActions.js"></script>

<template>
	<div :class="[$style.imageCallToActions, {[$style.transitionInComplete]: transitionInComplete}]">
		<div :class="$style.callToActionsWrapper" class="abs-fill">
			<div :class="$style.callToActionsImages" class="abs-fill">
				<div
					v-for="(callToAction, index) in data.callToActions"
					class="abs-fill"
					:class="[$style.callToActionImage, {[$style.isActive]: activeImage === index}]"
					:key="index"
					ref="image"
				>
					<ResponsiveImage
						class="abs-fill"
						:componentId="`ResponsiveImageNormal${index}`"
						:class="$style.background"
						:image="callToAction.background"/>
					<ResponsiveImage
						class="abs-fill"
						:componentId="`ResponsiveImageBlurred${index}`"
						:class="$style.backgroundBlurred"
						:image="callToAction.backgroundBlurred"/>
				</div>
			</div>
			<div :class="$style.callToActionsContent" class="abs-fill">
				<a
					v-for="(callToAction, index) in data.callToActions"
					v-link="{ path: callToAction.link.target }"
					@mouseenter="handleMouseEnter(index)"
					@mouseleave="handleMouseLeave"
					:key="index"
					:style="{width: `${100 / data.callToActions.length}%`}"
					:class="$style[ClassNameHelper.parseTheme(callToAction.theme)]">

					<span :class="$style.textWrapper">
						<span :class="$style.paginationNumber" v-html="getPaginationNumber(index + 1)"></span>
						<h3 :class="$style.heading" class="heading heading-03" v-html="callToAction.heading"></h3>
						<p :class="$style.copy" class="copy copy-01" v-html="callToAction.paragraph"></p>
					</span>

					<div :class="$style.clipMask" ref="clipMask">
						<div :class="$style.triangle" :style="{
							'border-bottom-width': `${triangleSize}px`,
							'border-left-width': `${triangleSize}px`,
							'top': `-${triangleSize}px`,
						}"></div>
					</div>
				</a>
			</div>
		</div>

	</div>
</template>
