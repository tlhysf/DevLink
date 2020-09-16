const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());

mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB successfully connected');
	})
	.catch((err) => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

// app.get('/', (req, res) => res.send("Hello"));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
