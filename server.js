const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('DB connected!'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

// routes middleware
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on ${port}`));
