<template>

  <div id="app" class="comp">
    <h1>Main component</h1>
    <li v-for="blueprint in blueprints" @click="getSteps(blueprint)" >{{blueprint.name}}</li>
    <input placeholder="add blueprint" @keyup.enter="addBlueprint($event)"/>
    
    


    <steps v-bind:blueprint="selected_blueprint">steps</steps>
    

  </div>


</template>

<script>
import steps from './components/Steps'
import {blueprints_ref} from './components/settings.js'

export default {
  name: 'app',
  components: {
    steps
  },
  data: function() {
    return { 
      blueprints: [],
      //db: "",
      //blueprints_ref: "",
      //steps_ref: "",
      //steps: [],
      selected_blueprint: {}
    }
  },
  methods: {

    addBlueprint: function(el) {
      blueprints_ref.add({name:el.target.value})
      el.target.value = ""
    },
    getSteps: function(blueprint) {
      this.selected_blueprint = blueprint
    }
  },
  created: function() {

      //TODO check if this is now global and if so change
      let varscope = this


      //TODO move into blueprints component
      //realtime triggered updates
      blueprints_ref.onSnapshot(function(snap){
        console.log("change detected")
        varscope.blueprints = []
        snap.forEach( doc => {
          
          let obj = doc.data()
          obj.id = doc.id

          varscope.blueprints.push(obj)
        
        })
        
        
        
      })



  }
}







</script>

<style>

* {
  font-size: 14px;
}

h1 {
  font-size: 18px;
}

#app {
  font-family: sans-serif;
}

input {
  padding: 6px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: block;
}

button {
  background-color: white;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 6px;
  border-radius: 6px;
}

.comp {
  border: 1px solid lightgrey;
  padding: 6px;
}


</style>
