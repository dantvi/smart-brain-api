const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const db = require('./db-config');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('success') });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
