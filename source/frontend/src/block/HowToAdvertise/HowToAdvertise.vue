<style src="./HowToAdvertise.scss" module lang="scss"></style>
<script src="./HowToAdvertise.js"></script>

<template>
	<div :class="$style.howToAdvertise">
		<div class="overrule-overlap">
			<div class="site-frame" :class="$style.viewport">
				<header :class="$style.header">
					<h2 :class="$style.heading" class="heading heading-04" v-html="data.heading"></h2>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'howToAdvertise',
								action: 'click',
								label: data.link.title
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:class="$style.button"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"/>
				</header>
				<div :class="$style.advertisementSteps">
					<div :class="$style.stepsViewport" ref="stepsViewport">
						<ul :class="$style.steps" ref="steps">
							<li :class="$style.step" v-for="(step, index) in data.steps" :key="index" ref="step">
								<button :class="$style.button" class="button" @click="handleOpenStep(index)">
									<figure class="icon" :class="$style.image">
										<Icon :name="step.icon" class="abs-center" :class="$style.icon"></Icon>
									</figure>
									<div class="content" :class="$style.content">
										<h2 class="heading heading-07" v-html="step.heading"></h2>
										<p class="copy copy-01" v-html="step.paragraph"></p>
									</div>
								</button>
							</li>
						</ul>
					</div>
					<ScrollBar componentId="ScrollBar" @update="handleScrollBarUpdate"/>
				</div>
			</div>
		</div>
	</div>
</template>
