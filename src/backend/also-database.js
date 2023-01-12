const mongoose = require('mongoose');
const userModel = require('./User')

const server = '127.0.0.1:27017';
const database = 'also';      // Since we made our schema into a model, this should be created


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

//   let user = new userModel({
// 	name: "te",
// 	email: "test@nuevaschool.org",
//     username: "testt",
//     password: "pass",
//     posts: [{
//         title: "hello ther",
//         description: "yes",
//         overflow: true
//     }]

//   })

//   user.save()
// 	.then(doc => {
//   	console.log("user " +doc.name+ " added to the database")
//   	console.log(doc)
// 	})
// 	.catch(err => {
//   	console.error(err)
// 	})

}
    
    

//creates a new database object
//which calls _connect()
module.exports = new Database()
