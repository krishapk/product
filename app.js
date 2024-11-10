const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const connectDB = require('./config/keys');

require('dotenv').config();
connectDB();

const app = express();
app.set('view engine', 'ejs');

// Middleware ......
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Routes
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
