<template>
	<form @submit.prevent="save">
		<div class="form-group">
			<label for="#{{ request.ID }}-request-title">Request title</label>
			<input
				type="text" id="{{ request.ID }}-request-title"
				v-model="request.Title"
				class="form-control"
				placeholder="Title of your request..."
				required
			/>
		</div>
		<div class="form-group">
			<label for="#{{ request.ID }}-request-content">Description of your task</label>
			<textarea
				id="{{ request.ID }}-request-content"
				rows="10"
				v-model="request.Content"
				class="form-control"
				placeholder="Describe your request..."
				required
			></textarea>
		</div>
		<div>
			<tags-viewer :parent="request" :edit-mode="true"></tags-viewer>
		</div>
		<div>
			<div class="form-group">
				<label for="request-date-start-input">Période souhaitée (début): </label>
				<input type="date" v-model="request.PeriodStart" id="request-date-start-input" class="form-control">
			</div>
			<div class="form-group">
				<label for="request-date-end-input">Période souhaitée (fin): </label>
				<input type="date" v-model="request.PeriodEnd" id="request-date-end-input" class="form-control">
			</div>

			<div class="form-group">
				<div class="form-inline">
					<div class="form-group">
						<label for="request-duration-input">Durée </label>
						<input type="number" v-model="duration" size="2" id="request-duration-input" class="form-control">
					</div>
					<div class="form-group">
						<select v-model="durationUnit" class="form-control">
							<option value="minute">minutes</option>
							<option value="hour">heures</option>
							<option value="day">jours</option>
						</select>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="form-inline">
					<div class="form-group">
						<label for="request-frequency-input">Fréquence</label>
						<input type="number" v-model="request.Frequency" min="0" id="request-frequency-input" class="form-control"> fois par
					</div>
					<div class="form-group">
						<select v-model="request.FrequencyUnit" class="form-control">
							<option value="day">jour</option>
							<option value="week" selected>semaine</option>
							<option value="month">mois</option>
						</select>
					</div>
				</div>
			</div>

			<button type="submit" class="btn btn-primary btn-block btn-lg">Save</button>
		</div>
	</form>
</template>

<script type="text/babel">
	import TagsViewer from './TagsViewer.vue';
	import moment from 'moment';

	export default {
		props: {
			request: {
				type: Object,
				default: () => ({
					Tags: [],
					Status: 'pending'
				})
			}
		},
		data() {
			return {
				duration: null,
				durationUnit: 'hour'
			}
		},
		watch: {
			duration(newValue) {
				if (newValue)
					this.request.Duration = moment.duration(Number(this.duration), this.durationUnit).asSeconds();
			},
			durationUnit(newValue) {
				if (newValue)
					this.request.Duration = moment.duration(Number(this.duration), this.durationUnit).asSeconds();
			}

		},
		methods: {
			save() {
				this.request.Frequency = Number(this.request.Frequency);
				this.$dispatch('on-save', this.request);
			}
		},
		components: {
			TagsViewer
		}
	}
</script>

<style>
	textarea {
		resize: vertical;
	}
</style>
