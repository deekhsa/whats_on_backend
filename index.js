const express = require('express');
const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://deeksha:1234@cluster0.juglg.mongodb.net/Personal?retryWrites=true&w=majority";

const app = express();

mongoose.connect(DB_URI)

const con = mongoose.connection;

con.on('open', () => {
    console.log("Connected");
});

app.use(express.json())

const restaurants = require('./routes/restaurant')
app.use('/restaurants', restaurants)


app.listen(9000, () =>{
    console.log('server listening in port:9000')
})
