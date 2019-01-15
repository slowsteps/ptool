<template>
	<div class="comp">
		<h1>Blueprints component</h1>
		<li v-for="blueprint in localblueprints" @click="getSteps(blueprint)">{{blueprint.name}}</li>
    <input placeholder="add blueprint" @keyup.enter="addBlueprint($event)"/>
    
	</div>
</template>

<script>

  import {blueprints_ref} from './settings.js'


  export default {
    name: 'blueprints',
    props: {blueprint: Object},
    data() {
      return {
        localblueprints: []
      }
    },

    methods: {

      addBlueprint: function(el) {
        blueprints_ref.add({name:el.target.value})
        el.target.value = ""
      },
      getSteps: function(blueprint) {
        console.log("implement route here")
        //this.selected_blueprint = blueprint
      }


    },

  created: function() {

      //TODO check if this is now global and if so change
      //get rid of local
      let varscope = this

      blueprints_ref.onSnapshot(function(snap){
        console.log("change detected - bp component")
        varscope.localblueprints = []
        snap.forEach( doc => {
          
          let obj = doc.data()
          obj.id = doc.id

          varscope.localblueprints.push(obj)
        
        })
        
        
        
      })



  }


  }
</script>


