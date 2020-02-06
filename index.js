const express = require('express'); //Framework to build server side application
const morgan = require('morgan'); //Logging the nodejs requests
const bodyParser = require('body-parser'); //To get the JSON data
const urls = require('./db/urls');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public')); //If a request comes with '/' check if file is in there if it is then serve it up.
// app.get('/', (req, res) => {
//     res.send('Hello, World !!');
// });
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get('/:name', async (req, res) => {
    const shorty = await urls.find(req.params.name);//FInding the parameter name in database
    if(shorty){
        res.redirect(shorty.url);
    }else{
        res.redirect(`/404.html?name=${req.params.name}`);
    }
});


app.post('/api/shorty', async (req, res) => {
    try {
        const url = await urls.create(req.body);//Passing the body data which is JSON to create function
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});

