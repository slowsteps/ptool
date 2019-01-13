<template>
	<div class="comp">
		<h1>Steps component</h1>
		<h2 v-text="blueprint.name"></h2>
		<button @click="getSteps()"> getsteps </button>		
		<li v-for="step in localsteps">{{step.name}}</li>
    <input placeholder="add step" @keyup.enter="addStep($event)"/>
    
	</div>
</template>

<script>

  import {steps_ref} from './settings.js'


  export default {
    name: 'steps',
    props: {blueprint: Object},
    data() {
      return {
        localsteps: []
      }
    },

    methods: {

      getSteps: function() {
        steps_ref.where("blueprint","==",this.blueprint.id).onSnapshot( 
          snap => { 
            this.localsteps = []
            snap.forEach( doc => {
              this.localsteps.push(doc.data()) 
            } )}
          )
      },


      addStep: function(el) {
       steps_ref.add({blueprint: this.blueprint.id,name: el.target.value})
       el.target.value = ""
      }


    }
  }
</script>


