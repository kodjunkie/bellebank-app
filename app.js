const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pageRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');

const app = express();

// Configuration
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(pageRoutes);
app.use('/auth', authRoutes);

// Error handler
app.use((error, req, res, next) => {
	console.log(error);
});

// Start app
mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log('App is running...');
		});
	});
