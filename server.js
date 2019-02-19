const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profileId = require('./controllers/profileId');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'helleemmery',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(database.users);
})

//LOG IN
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//PROFILE ID
app.get('/profile/:id', (req, res) => { profileId.handleProfileGet(req, res, db) });

//IMAGE ENTRY RANK
app.put('/image', (req, res) => {image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => {image.handleAPI(req, res) });

//HASH BCRYPT 
bcrypt.hash('password', null, null, function(err, hash) { 
    console.log(hash);
});


app.listen(3001, ()=> {
    console.log('Im running');
})

