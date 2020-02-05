const monk = require('monk');
const connectionURL = "mongodb+srv://imrishabh18:shortyfycluster0-yk3h6.mongodb.net/test?retryWrites=true&w=majority";
const db = monk(connectionURL);

module.exports = db;