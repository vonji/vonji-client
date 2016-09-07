<template>
	<div>
		<span class="glyphicon glyphicon-star{{ tempGrade >= 1 || (tempGrade === 0 && grade >= 1) ? '' : '-empty' }}"  @click="setGrade(1)" @mouseover="tempGrade = 1" @mouseout="tempGrade = 0"></span>
		<span class="glyphicon glyphicon-star{{ tempGrade >= 2 || (tempGrade === 0 && grade >= 2) ? '' : '-empty' }}"  @click="setGrade(2)" @mouseover="tempGrade = 2" @mouseout="tempGrade = 0"></span>
		<span class="glyphicon glyphicon-star{{ tempGrade >= 3 || (tempGrade === 0 && grade >= 3) ? '' : '-empty' }}"  @click="setGrade(3)" @mouseover="tempGrade = 3" @mouseout="tempGrade = 0"></span>
		<span class="glyphicon glyphicon-star{{ tempGrade >= 4 || (tempGrade === 0 && grade >= 4) ? '' : '-empty' }}"  @click="setGrade(4)" @mouseover="tempGrade = 4" @mouseout="tempGrade = 0"></span>
		<span class="glyphicon glyphicon-star{{ tempGrade >= 5 || (tempGrade === 0 && grade >= 5) ? '' : '-empty' }}"  @click="setGrade(5)" @mouseover="tempGrade = 5" @mouseout="tempGrade = 0"></span>
		<button class="btn btn-default btn-sm" @click="dispatchGrade">Grade</button>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			grade: {
				type: Number,
				required: false
			},
			data: {}
		},
		data() {
			return {
				tempGrade: 0
			}
		},
		methods: {
			setGrade(n) {
				this.grade = n;
			},
			dispatchGrade() {
				this.$dispatch('grade', this.grade, this.data);
			}
		}
	}
</script>