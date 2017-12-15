require('dotenv').config();
const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
massive = require('massive'),
controller = require('./controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(`${_dirname}/../build`));

app.get('/api/shelf/:id', controller.shelf);
app.get('/api/bin/:id', controller.getBin);
app.put('/api/bin/:id', controller.update);
app.delete('/api/bin/:id', controller.delete);
app.post('/api/bin/:id', controller.create);


massive(process.env.CONNECTIONSTRING).then(db => {
    app.set('db', db);
    app.get('db').init.seed_file().then(response => {
        console.log(response);
    })
    app.listen(process.env.PORT, () => {
        console.log("i am listening on port", process.env.PORT)
    })
})

