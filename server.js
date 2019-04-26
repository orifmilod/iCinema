const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoute = require('./routes/movies');
const genreRoute = require('./routes/genres');
const userRoute = require('./routes/users');


//Connecting mongoDB
mongoose.connect("mongodb+srv://admin:TxSLxLKRYfk2OiHZ@icinema-4p2wg.mongodb.net/iCinema?retryWrites=true", {useNewUrlParser: true});

//Checking the connection to db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Mongo Database is connected now!")
});


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//To prevent CORS errors
app.get((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', '*');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, HEAD');
        return res.status(200).json({  });
    }
    next();
});

//App routes
app.use('/api/movies', movieRoute);
app.use('/api/genres', genreRoute);
app.use('/api/users', userRoute);


//Invalid routes
app.use((req, res, next) => {
    const error = new Error('This route does not exist.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error.message); 
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; 