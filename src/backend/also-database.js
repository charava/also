const mongoose = require('mongoose');
const userModel = require('./User')

const server = '127.0.0.1:27017';
const database = 'also';      // Since we made our schema into a model, this should be created


// make sure to run to start:
// brew services start mongodb-community@5.0

// tell it to stop by running 
// brew services stop mongodb-community@5.0

// If you want to double check if its running, you can run
// brew services list

// for more info: https://docs.google.com/document/d/1CczD58z8Fk-heLNuYfxGV1dp9X4yvafBptiRwIPNjVU/edit

// -----------------
//get to mongodb shell
// type mongosh in cd ~
// show dbs
// db
// use <db name>;
// db.dropDatabase()
// show dbs
// exit


class Database {
  constructor() {
    this._connect()
  }


_connect() {
     mongoose.connect(`mongodb://${server}/${database}`, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
       .then(dbSuccess())
       .catch(err => {
         console.error('Database connection error')
       })
    
  }
}

function dbSuccess(){
  console.log('Database connection successful')


  // let user = new userModel({
  //   firstName: "hello",
  //   lastName: "rosario",
  //   email: "charcharrosario@gmail.com",
  //   phone: "6504362577",
  //   age: "19",
  //   gender: "female",
  //   pronouns: "she/her",
  //   birthdate: "03/26/2007",
  //   city: "hillsborough",
  //   topExperience: "ca",
  //   explanation: "hola",
  //   durationExperienced: "okay",
  //   minAge: 11,
  //   maxAge: 12,
  //   genderPref: "female",
  //   additionalPref: "none",
  //   acceptedTerms: true,
  //   matched: false,
  //   time: "100",
  // })

  // user.save()
	// .then(doc => {
  // 	console.log("user " + doc.firstName+ " added to the database")
  // 	console.log(doc)
	// })
	// .catch(err => {
  // 	console.error(err)
	// })

}
    
//creates a new database object
//which calls _connect()
module.exports = new Database()
