const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');

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
	.connect(keys.mongoURI || process.env.MONGO_URI, {
		useNewUrlParser: true,
		ssl: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB successfully connected');
	})
	.catch((err) => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// serve static assests if in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('./client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Origin',
		'http://devlink-merndemo.herokuapp.com'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
