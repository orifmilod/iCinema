const cors = require('cors');
const path = require('path');
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoute = require('./routes/movies');
const genreRoute = require('./routes/genres');
const userRoute = require('./routes/users');

const app = express();
//To prevent CORS errors
app.use(cors());

//Connecting mongoDB
const databaseConfig = require('./config/keys');
mongoose.connect('mongodb+srv://admin:7fx6wiDzAGOOm3ZH@icinema-4p2wg.mongodb.net/iCinema?retryWrites=true', { useNewUrlParser: true, useUnifiedTopology: true })

//Checking the connection to db
var db = mongoose.connection;
db.once('open', () => console.log("Mongo Database is connected now!"));
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static('./uploads'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));



//App routes to handle requests
app.use('/api/movies', movieRoute);
app.use('/api/genres', genreRoute);
app.use('/api/users', userRoute);

//Serve our static asset if in production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
else {
    app.use(express.static(path.join(__dirname, '/client/public')));
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}


//Invalid routes
// app.use((req, res, next) => {
//     const error = new Error('This route does not exist.');
//     error.status = 404;
//     next(error);
// });
var exit = function exit() {
    setTimeout(function () {
      process.exit(1);
    }, 0);
  };
app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error.message); 
    // exit();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; 