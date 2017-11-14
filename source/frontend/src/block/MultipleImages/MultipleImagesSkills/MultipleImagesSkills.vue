<style src="./MultipleImagesSkills.scss" module lang="scss"></style>
<script src="./MultipleImagesSkills.js"></script>

<template>
	<div :class="$style.multipleImagesSkills">
		<div :class="$style.content">
			<h2 class="heading heading-07" v-html="data.heading" :class="$style.heading"></h2>
			<ul :class="$style.skills">
				<li
					:class="$style.skill"
				    v-for="(skill, index) in data.skills"
					v-html="skill"
					:key="index"
				    class="copy copy-03"></li>
			</ul>
		</div>
	</div>
</template>
