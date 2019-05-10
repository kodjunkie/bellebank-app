const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const pageRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');

const app = express();

// Configuration
dotenv.config();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(pageRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
	console.log('App is running...');
});
