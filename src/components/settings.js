import firebase from 'firebase'


export default {
	name: "enterprise",

	speed: 10000,


	jump: function() {
		console.log("jumping to lightspeed..")
	}

}



    const config = {
        apiKey: "AIzaSyC58pRaWYD7TkA9cgXy9Bp17Njvi_5hm6c",
        authDomain: "ptool-01.firebaseapp.com",
        databaseURL: "https://ptool-01.firebaseio.com",
        projectId: "ptool-01",
        storageBucket: "ptool-01.appspot.com",
        messagingSenderId: "833427644098"
      }

      firebase.initializeApp(config)
     
      var db = firebase.firestore()


      db.settings({
        timestampsInSnapshots: true
      })

      var blueprints_ref = db.collection("blueprints")
      var steps_ref = db.collection("steps")







function orbit() { console.log("entering orbit")}

var shipclass = "c-class"

export {orbit,shipclass,blueprints_ref,steps_ref}