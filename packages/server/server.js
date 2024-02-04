require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/dbConn');
const morgan = require('morgan');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const routes = require('./routes');

// Connect to the database
connectDB();

// request logging
app.use(morgan('dev'));

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/api/health', (req, res) => {
  res.send('OK');
});

// Routes
app.use(routes);


app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});