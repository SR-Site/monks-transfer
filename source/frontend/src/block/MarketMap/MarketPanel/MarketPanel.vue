<style src="./MarketPanel.scss" module lang="scss"></style>
<script src="./MarketPanel.js"></script>

<template>
	<div :class="$style.wrapper">
		<div :class="$style.mask" class="abs-fill" ref="mask" @click="handleClose"></div>
		<div :class="$style.panel" ref="panel">
			<div :class="$style.marketLabel" ref="label">{{marketLabel}}</div>
			<div :class="$style.panelContent">
				<div :class="$style.panelHeader">
					<div :class="$style.tabWrapper">
						<button
								v-for="(tab, index) in marketData"
								:key="index"
								:class="['button', $style.tab, {[$style.isActive]: activeTab === index}]"
								@click="handleTabChange(index)"
						>
							{{tab.label}}
						</button>
					</div>
					<ButtonCircleClose
							componentId="ButtonCircleClose"
							title="Close"
							:size="Size.LARGE"
							:type="ButtonType.ACTION"
							:class="$style.close"
							@click="handleClose"
					/>
				</div>
				<div class="scroll-wrapper" :class="$style.panelBody" ref="scrollWrapper">
					<div class="scroll-content" data-scroll-content :class="$style.scrollContent">
						<div data-content-inner :class="$style.blocks">
							<component
								v-for="(block, index) in marketBlocks"
								:class="$style.block"
								:is="block.name"
								:key="index"
								:data="block.data"
								componentId="`PanelBlock.${index}`"
							/>
						</div>
					</div>
					<div class="scroll-bar" data-scroll-bar>
						<span class="knob" data-scroll-knob></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
