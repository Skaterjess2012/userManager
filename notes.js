const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
let jsonFile = __dirname + '/recipe.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/recipes', express.static('public'));

//when a get request is coming from the root
app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/time', (req, res) => {
    let date = new Date();
    res.send(`${date.getHours()}:${date.getMinutes()}`);
});

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/test.txt');
});

//forgiving path (makes the character before ? forgivable)
app.get('/files?', (req, res) => {
    res.sendFile(__dirname + '/test.txt');
});

//Wild card (anything before and after (between) will be good) *only with implimenting legacy code that you cant fix ASAP
app.get('/files*', (req, res) => {
    res.sendFile(__dirname + '/test.txt');
});

app.listen(3000, () => {
    console.log('Listening on port 30000');
});