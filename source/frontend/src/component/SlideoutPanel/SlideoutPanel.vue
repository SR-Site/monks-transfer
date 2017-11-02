<style src="./SlideoutPanel.scss" module lang="scss"></style>
<script src="./SlideoutPanel.js"></script>

<template>
	<div>
		<div :class="$style.mask" class="abs-fill" ref="mask" @click="close"></div>
		<div :class="[$style.slideoutPanel]" ref="panel">
			<ButtonCircleClose
				componentId="ButtonCircleClose"
				title="Close"
				:size="Size.LARGE"
				:type="ButtonType.ACTION"
				:class="$style.button"
				@click="close"/>
			<div :class="$style.panelBody">
				<div :class="$style.scrollWrapper" ref="scrollWrapper" class="scroll-wrapper">
					<div :class="$style.scrollContent" data-scroll-content class="scroll-content">
						<div :class="$style.panelInnerContent" data-content-inner>
							<PanelContact
								componentId="PanelContact"
								@showSpinner="handleShowSpinner"
								@hideSpinner="handleHideSpinner"
								@isReady="component => handlePanelReady(component, SlideoutPanel.CONACT)"/>
						</div>
					</div>
					<div class="scroll-bar" data-scroll-bar>
						<div class="knob" data-scroll-knob></div>
					</div>
				</div>
			</div>
			<Spinner componentId="Spinner"/>
		</div>
	</div>
</template>
