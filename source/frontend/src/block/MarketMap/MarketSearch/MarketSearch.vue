<style src="./MarketSearch.scss" module lang="scss"></style>
<script src="./MarketSearch.js"></script>

<template>
	<div :class="$style.marketSearch">
		<MarketSearchResult
			@selectMarket="handleSelectMarket"
			componentId="MarketSearchResult"
			:selectedMarket="selectedMarket"
			:class="$style.marketSearchResult"
			:notFoundMessage="notFoundMessage"
			:results="results"
			:query="query"/>
		<form :class="$style.marketSearchForm" novalidate @submit.prevent="handleSubmit">
			<div :class="$style.query">
				<ButtonCircleClose
					v-if="query"
					componentId="ButtonCircleClose"
					title="Clear Search"
					:size="Size.LARGE"
					:type="ButtonType.ACTION"
					:class="$style.clearButton"
					@click="clearSearch"/>
				<div class="input-text input-text-main" v-focus-border>
					<input
						@input="handleInputChange"
						type="text"
						autocomplete="off"
						name="query"
						:class="{'has-value': query}"
						:value="query">
					<span class="placeholder-label">{{ searchPlaceholder }} </span>
				</div>
			</div>
			<button class="button" :class="$style.submitButton" type="submit">{{ searchLabel }}</button>
		</form>
	</div>
</template>
