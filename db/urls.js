const db = require('./connection');
const Joi = require('joi'); //Schema validation

const urls = db.get('urls');
const schema = Joi.object().keys({
    name: Joi.string().token().min(1).max(100).required(),
    url: Joi.string().uri({
        scheme: [
            /https?/ //get http 's' is optional
        ]
    }).required()
}).with('name', 'url');

//almostShorty = { 
//     name = ,
//     url =
// }

function find(name){
    return urls.findOne({
        name 
    })
}

async function create(almostShorty) {
    const result = Joi.validate(almostShorty, schema);
    if (result.error === null) {
        const url = await urls.findOne({//Checking in database
            name: almostShorty.name
        });
        if (!url) {
            return urls.insert(almostShorty); //Inserting the object in the Data Base.
        }else{
            return Promise.reject({
                isJoi: true,
                details: [{
                    message: 'Short name is in use.' //Check main.js from line 25 
                }]
            })
        }
    } else {
        return Promise.reject(result.error);
    }
};

module.exports = {
    create,
    find
}; //Exporting the create function. 