<style src="./PanelContact.scss" module lang="scss"></style>
<script src="./PanelContact.js"></script>

<template>
	<form class="form" :class="$style.panelContact" novalidate @submit.prevent="submit">
		<ButtonTertiary
			componentId="ButtonPrimary"
			:class="$style.phoneButton"
			:title="$t('global.cta.contact_us').toUpperCase()"
			:label="$t('global.cta.contact_us').toUpperCase()"
			:type="ButtonType.LINK"
			:theme="Theme.DARK"
			:link="{
				type: BackendLinkType.CONTACT_KERNEL,
				target: '',
			}"/>

		<h3 :class="$style.subTitle" class="copy copy-03" v-html="subHeading"></h3>
		<h2 :class="$style.heading" class="heading-06 heading" v-html="heading"></h2>

		<fieldset class="form-fieldset" :class="$style.fields">
			<div class="text-input-holder" v-for="(field, index) in fieldData" :key="index">
				<div class="input-text input-text-main" :class="{'is-invalid': errors.has(field.name) }"
				     v-focus-border>
					<input
						v-validate="field.validationRules"
						autocomplete="off"
						@input="event => handleInputChange(event, field)"
						:value="field.value"
						:class="{'has-value': field.value}"
						:type="field.type"
						:name="field.name"
						:id="field.name" />
					<span class="placeholder-label">
						{{ $t(`global.form.placeholder.${field.localeKey}`) }}
					</span>
				</div>
			</div>
			<ButtonSecondary
				componentId="ButtonSecondary"
				@click="handleSubmit"
				:class="$style.submitButton"
				:title="submitLabel"
				:label="submitLabel"
				:type="ButtonType.ACTION"
				:theme="Theme.DARK"/>
		</fieldset>
	</form>
</template>
