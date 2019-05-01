const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoute = require('./routes/movies');
const genreRoute = require('./routes/genres');
const userRoute = require('./routes/users');


//Connecting mongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//Checking the connection to db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Mongo Database is connected now!")
});

app.use(express.static('./uploads'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

//To prevent CORS errors
app.get((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, HEAD');
        return res.status(200).json({ });
    }
    next();
});

//App routes to handle requests
app.use('/api/movies', movieRoute);
app.use('/api/genres', genreRoute);
app.use('/api/users', userRoute);


//Invalid routes
app.use((req, res, next) => {
    const error = new Error('This route does not exist.');
    error.status = 404;
    next(error);
});
var exit = function exit() {
    setTimeout(function () {
      process.exit(1);
    }, 0);
  };
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error.message); 
    // exit();
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; 