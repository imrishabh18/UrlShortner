
var mongo = require('mongodb');
var monk = require('monk');
const connectionString = process.env.MONGODB_URI || 'localhost/shortyfy';
var db = monk(connectionString);
db.then(() =>{
  console.log("connection success");
}).catch((e)=>{
  console.error("Error !",e);
});

module.exports = db;

