const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const jsonFile = __dirname + '/users.json';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/userListing', (req, res) => {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) console.log(err);

        let jsonData = JSON.parse(data);
        let usrObj = {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            delete: null
        }

        jsonData.users.push(usrObj);
        res.render('userListing', {users: jsonData.users});

        fs.writeFile(jsonFile, JSON.stringify(jsonData), 'utf8', err => console.log(err));
    });
});

app.get('/userListing', (req, res) => {
  fs.readFile(jsonFile, 'utf8', (err, data) => {
    if (err) console.log(err);

    let jsonData = JSON.parse(data);
    res.render('userListing', {users: jsonData.users});
  })
});

app.post('/userEditSubmit', (req, res) => {
  fs.readFile(jsonFile, 'utf8', (err, data) => {
    if (err) console.log(err);

    let jsonData = JSON.parse(data);
    let editedUsers = [];
    console.log('////////////////////');
    console.log(req.body);
    // jsonData.users = editedUsers;
    res.render('userListing', {users: jsonData.users});

    // fs.writeFile(jsonFile, JSON.stringify(jsonData), 'utf8', err => console.log(err));

  });
});

app.get('/userEdit', (req, res) => {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) console.log(err);

        let jsonData = JSON.parse(data);
        res.render('userEdit', {users: jsonData.users});

    });
});

app.listen(3000, () => {
    console.log('Listening on port 30000');
});
