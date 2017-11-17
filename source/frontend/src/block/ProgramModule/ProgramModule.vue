<style src="./ProgramModule.scss" module lang="scss"></style>
<script src="./ProgramModule.js"></script>

<template>
	<div :class="$style.programModule">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header" ref="heading" v-if="data.heading || data.paragraph">
					<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
					<p class="copy copy-01" v-html="data.paragraph"></p>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.programs" ref="draggableElement" class="js-draggable-element">
						<ProgramTeaser
							v-for="(item, index) in data.items"
							:componentId="`ProgramTeaser${index}`"
							:key="index"
							:data="item"
							:class="$style.programTeaser"
							ref="program"
						/>
					</div>
				</div>
				<ScrollBar
					componentId="ScrollBar"
					v-show="showScrollBar"
					@update="handleScrollBarUpdate"
					@end="handleScrollBarEnd"
					:class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
