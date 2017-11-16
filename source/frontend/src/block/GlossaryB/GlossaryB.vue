<style src="./GlossaryB.scss" module lang="scss"></style>
<script src="./GlossaryB.js"></script>

<template>
	<div :class="$style.glossaryB">
		<div class="site-frame">
			<div :class="$style.glossaryNavigation">
				<div :class="$style.mobileSelect">
					<div :class="$style.selectedValue">
						<span :class="$style.label" v-html="activeCategory"></span>
						<Icon :class="[$style.icon, $style.selectIcon]" name="circle-arrow-down"/>
					</div>
					<select name="categories" :class="$style.select" @change="handleSelectChange">
						<option
							v-for="(category, index) in categories"
							v-html="category.label"
							:key="index"
							:value="category.value"
						></option>
					</select>
				</div>
				<button
					@click="handleCategoryClick(category.value)"
					class="button"
					v-for="(category, index) in categories"
					v-html="category.label"
					:key="index"
					:class="[$style.navigationButton, {[$style.isActive]: category.value === activeCategory}]"></button>
				<form v-if="searchActive" novalidate @submit.prevent="handleFormSubmit" :class="$style.searchForm">
					<div class="input-text input-text-main" v-focus-border :class="$style.query">
						<input
							autocomplete="off"
							@input="handleQueryChange"
							:value="query"
							:class="{'has-value': query}"
							type="text"
							name="query"
						/>
						<span class="placeholder-label" v-html="data.searchPlaceholder"></span>
					</div>
					<button type="button" :class="$style.closeButton" class="button" @click="handleToggleSearch">
						<Icon :class="$style.icon" name="cross"/>
					</button>
				</form>
				<button
					type="button"
					v-if="!searchActive"
					class="button"
					:class="$style.searchButton"
					@click="handleToggleSearch">
					<Icon class="abs-center" :class="$style.icon" name="search"/>
				</button>
			</div>
		</div>
		<div :class="$style.wrapper">
			<div class="site-frame">
				<div :class="$style.glossaryItems">
					<div
						v-for="(category, index) in paginatedGlossaryItems"
						:key="index"
						:class="$style.glossaryItem">
						<h2 :class="$style.glossaryHeading" class="heading heading-05" v-html="category.label"></h2>
						<p :class="$style.glossaryCopy" class="copy copy-01" v-html="category.value"></p>
					</div>
					<div
						v-if="paginatedGlossaryItems.length === 0"
						:class="$style.glossaryItem">
						<h2 :class="$style.glossaryHeading" class="heading heading-05"
						    v-html="data.noResult.paragraph"></h2>
						<p :class="$style.glossaryCopy" class="copy copy-01" v-html="data.noResult.paragraph"></p>
					</div>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-show="showLoadMoreButton"
						@click="handleShowMore"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'GlossaryA',
								action: 'click',
								label: data.showMoreLabel,
							}
						}"
						:class="$style.showMore"
						:title="data.showMoreLabel"
						:label="data.showMoreLabel"
						:type="ButtonType.ACTION"
						:theme="Theme.DARK"/>
				</div>
			</div>
		</div>
	</div>
</template>
