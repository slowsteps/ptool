<template>

  <div id="app">
    <li v-for="blueprint in blueprints" @click="getSteps(blueprint)" >{{blueprint.name}}</li>
    <input placeholder="add blueprint" @keyup.enter="addBlueprint($event)"/>
    
    
    <h2>{{selected_blueprint.name}}</h2>

    <li v-for="step in steps">{{step.name}}</li>
    <input placeholder="add step" @keyup.enter="addStep($event)"/>

  </div>


</template>

<script>
import firebase from 'firebase'


export default {
  name: 'app',
  data: function() {
    return { 
      blueprints: [],
      db: "",
      blueprints_ref: "",
      steps_ref: "",
      steps: [],
      selected_blueprint: ""
    }
  },
  methods: {

    addBlueprint: function(el) {
      blueprints_ref.add({name:el.target.value})
      el.target.value = ""
    },
    getSteps: function(blueprint) {
      //TODO change into onSnapShot
      console.log("getSteps" + blueprint.id)
      this.selected_blueprint = blueprint
      this.steps = []
      this.steps_ref.where("blueprint","==",blueprint.id).get().then( snap => { snap.forEach( doc => {this.steps.push(doc.data())} )})
    },
    addStep: function(el) {
     this.steps_ref.add({blueprint: this.selected_blueprint.id,name: el.target.value})
     el.target.value = ""
    }

  },
  created: function() {

    
    //Database setup
    //TODO move to seperate file
    const config = {
        apiKey: "AIzaSyC58pRaWYD7TkA9cgXy9Bp17Njvi_5hm6c",
        authDomain: "ptool-01.firebaseapp.com",
        databaseURL: "https://ptool-01.firebaseio.com",
        projectId: "ptool-01",
        storageBucket: "ptool-01.appspot.com",
        messagingSenderId: "833427644098"
      }

      firebase.initializeApp(config)
     
      //const db = firebase.firestore()
      this.db = firebase.firestore()


      this.db.settings({
        timestampsInSnapshots: true
      })

      this.blueprints_ref = this.db.collection("blueprints")
      this.steps_ref = this.db.collection("steps")


      //TODO check if this is now global and if so change
      let varscope = this

      //realtime triggered updates
      this.db.collection("blueprints").onSnapshot(function(snap){
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

#app {
  font-family: sans-serif;
}

input {
  padding: 6px;
  margin-top: 6px;
  display: block;
}

button {
  background-color: white;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 6px;
  border-radius: 6px;
}

</style>
