const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const jsonFile = __dirname + '/users.json';
const uuidv1 = require('uuid/v1');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/userListing', (req, res) => {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) console.log(err);
        let jsonData = JSON.parse(data);
        res.render('userListing', {users: jsonData.users});
    });
});

app.post('/addUser', (req, res) => {
    res.redirect('/userListing');
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) console.log(err);
        let jsonData = JSON.parse(data);
        let userObj = {
            uid: uuidv1(),
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
        jsonData.users.push(userObj);
        // res.render('userListing', {users: jsonData.users});
        fs.writeFile(jsonFile, JSON.stringify(jsonData), 'utf8', (err, data) => {
            if (err) console.log(err);
        });
    });
});

app.get('/edit/:uid', (req, res) => {
    let uid = req.params.uid;
    console.log(uid);
    res.redirect('/userListing');
});

app.get('/delete/:uid', (req, res) => {
    let uid = req.params.uid;
    console.log(uid);
    res.redirect('/userListing');
});

//req.params.userName
//app.get('/user/:userName)

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
