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
            userid: req.body.userid,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }

        jsonData.users.push(usrObj);
        res.render('userListing', {users: jsonData.users});

        fs.writeFile(jsonFile, JSON.stringify(jsonData), 'utf8', err => console.log(err));
    });
});

app.listen(3000, () => {
    console.log('Listening on port 30000');
});