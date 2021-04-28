
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var mongoose = require('mongoose');
var MongoDB = 'mongodb+srv://root:<your mongoDB access URL>/TLCTripRecordData?retryWrites=true&w=majority';
mongoose.connect(MongoDB, { useNewUrlParser: true ,useUnifiedTopology: true}, function (err) {

    if (err) {
        console.log('db hata: ' + err);
    } else {
        console.log('db başarı: ' + MongoDB);
    }
});
var routeTrip = require('./routes/Trip')
routeTrip(app)
var server = http.listen(2730, () => {
    console.log('server is running on port', server.address().port);
});