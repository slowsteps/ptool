<template>
	<div class="steps">
		<h1>Steps component</h1>
		{{selected_blueprint.name}}
		{{parent.blueprints}}
	</div>
</template>

<script>
  export default {
    name: 'steps',
    props: {selected_blueprint: Object,parent: Object},
    data() {
      return {
        test: "hoi says component"
      }
    },
    methods: {
      check() {
        //
      }
    }
  }
</script>


<style>

.steps {
	border: 1px solid lightgrey;
	padding: 6px;
}

</style>