<style src="./PersonaSelectorOptions.scss" module lang="scss"></style>
<script src="./PersonaSelectorOptions.js"></script>

<template>
	<ul :class="$style.personaSelectorOptions">
		<li
			v-for="(persona, index) in data"
			:key="index"
			:class="[$style.personaSelectorOption, {[$style.isActive]: activeIndex === index }]">
			<a
				class="button"
				@click="handlePersonaClick(index)"
				:class="[
					$style.personaButton,
					$style[ClassNameHelper.parsePersonaType(persona.personaType)]
			]">
					<span :class="$style.labelWrapper">
						<span :class="$style.label">
							<span class="pagination-number" :class="$style.paginationNumber"
							      v-html="padStart(index + 1)"></span>
							<span class="copy copy-01" v-html="persona.heading"></span>
						</span>
					</span>
			</a>
		</li>
	</ul>
</template>
