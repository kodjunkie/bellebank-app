const path = require('path');

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');

const pageRoutes = require('./routes/page');
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendor');
const mealRoutes = require('./routes/meal');
const { addAuthUserToRequest } = require('./middlewares/user');

// Configurations
dotenv.config();
const app = express();

const store = new MongoDBStore({
	uri: process.env.MONGODB_URI,
	collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		name: process.env.APP_NAME.toLowerCase() + '.sid',
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		store: store
	})
);
app.use(csrf());
app.use(flash());
app.use(addAuthUserToRequest);

// Global variable for all views
app.use((req, res, next) => {
	res.locals.isAuth = req.session.isLoggedIn;
	res.locals.authUser = req.session.isLoggedIn ? req.user._doc : null;
	res.locals.csrfToken = req.csrfToken();
	next();
});

// Routes
app.use(pageRoutes);
app.use('/auth', authRoutes);
app.use('/meals', mealRoutes);
app.use('/vendors', vendorRoutes);

// Error handler
app.use((error, req, res, next) => {
	console.log(error);
});

// Start app
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log('App is running...');
		});
	});
