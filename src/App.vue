<template>

  <div id="app">
    <li v-for="blueprint in blueprints">{{blueprint.name}}</li>
    <input placeholder="add blueprint" @keyup.enter="addBlueprint($event)"/>
  </div>

  

</template>

<script>
import firebase from 'firebase'


export default {
  name: 'app',
  data: function() {
    return { 
      blueprints: [],
      db: ""
    }
  },
  methods: {

    addBlueprint: function(el) {
      console.log(el.target.value)

      this.db.collection("blueprints").add({name:el.target.value})
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
        el.target.value = ""
    }

  },
  created: function() {

    
    //Database setup

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

      //TODO check if this is now global and if so change
      let varscope = this

      //realtime triggered updates
      this.db.collection("blueprints").onSnapshot(function(snap){
        console.log("change detected")
        
        varscope.blueprints = []
        snap.forEach( doc => {varscope.blueprints.push(doc.data())})
        
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
}

</style>
