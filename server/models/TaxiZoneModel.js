var mongoose = require('mongoose')
const taxiZoneSchema = new mongoose.Schema({
  
    LocationID : Number,
    Borough : String,
    Zone : String,
    service_zone : String,
    

},{strict:false})
module.exports = mongoose.model('TaxiZones',taxiZoneSchema);