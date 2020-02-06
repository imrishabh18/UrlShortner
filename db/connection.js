
var mongo = require('mongodb');
var monk = require('monk');
const connectionString = 'mongodb+srv://imrishabh18:1234@shortify-yk3h6.mongodb.net/test?retryWrites=true&w=majority';
var db = monk(connectionString);
db.then(() =>{
  console.log("connection success");
}).catch((e)=>{
  console.error("Error !",e);
});

module.exports = db;

