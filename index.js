require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;
const app = express();

mongoose.connect(DB_URI)
const con = mongoose.connection;

con.on('open', () => console.log("Connected to MongoDB"));

app.use(express.json());

const restaurants = require('./routes/restaurant');
app.use('/restaurants', restaurants);

app.listen(9000, () => console.log('Server listening on port 9000'));
