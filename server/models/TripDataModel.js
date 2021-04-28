var mongoose = require('mongoose')
require('@mongoosejs/double'); //plugin to support Double in mongoose
const tripDataSchema = new mongoose.Schema({
  
    tpep_pickup_datetime :{
        type:Date,
        require:false
    },
    tpep_dropoff_datetime : {
        type:Date,
        require:false
    },
    passenger_count : {
        type:Number,
        require:false
    },
    trip_distance :  {
        type:mongoose.Schema.Types.Double,
        require:false
    },
    PULocationID : {
        type:Number,
        require:false
    },
    DOLocationID : {
        type:Number,
        require:false
    },
    total_amount :  {
        type:mongoose.Schema.Types.Double,
        require:false
    },
    

},{strict:false})
module.exports = mongoose.model('Model',tripDataSchema,'tripdata');