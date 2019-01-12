<template>
	<div class="comp">
		<h1>Steps component</h1>
		<h2 v-text="parent.selected_blueprint.name"/></h2>
		<button @click="getSteps()"> getsteps </button>		
		<li v-for="step in localsteps">{{step.name}}</li>
    <input placeholder="add step" @keyup.enter="addStep($event)"/>
	</div>
</template>

<script>
  export default {
    name: 'steps',
    props: {parent: Object},
    data() {
      return {
        localsteps: []
      }
    },
    methods: {


    getSteps: function() {
      //TODO change into onSnapShot
      
      this.localsteps = []

      this.parent.steps_ref.where("blueprint","==",this.parent.selected_blueprint.id).get().then( 
      	snap => { snap.forEach( doc => {
      		this.localsteps.push(doc.data()) 
      		} )}
      	)
    },
    addStep: function(el) {
     this.parent.steps_ref.add({blueprint: this.parent.selected_blueprint.id,name: el.target.value})
     el.target.value = ""
    }




    }
  }
</script>


