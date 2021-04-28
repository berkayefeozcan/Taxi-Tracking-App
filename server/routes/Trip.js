
const TaxiZoneModel = require('../models/TaxiZoneModel');
const TripDataModel = require('../models/TripDataModel');
const YellowTripDataModel = require('../models/TripDataModel');
module.exports = function (app) {
    app.get('/getTaxiZones', (req, res) => {
        try {

            TaxiZoneModel.find({}).then((data) => {
                res.status(200).json({ message: 'success', locations: data });
            }).catch((err) => {
                console.log(err)
                res.status(404).json({ message: 'error' })
            })
        } catch (err) {
            console.log(err)
        }
    }),
        app.get('/getTaxiAmountBetweenTwoDate?', (req, res) => {
            var startDate = req.query.$startDate;
            var endDate = req.query.$endDate;
            var locationID = parseInt(req.query.$locationID);
            // console.log(typeof startDate)
            try {

                YellowTripDataModel.aggregate([
                    {
                        "$match": {
                            "$and": [
                                {
                                    "tpep_pickup_datetime": {
                                        "$gte": new Date(startDate),
                                        "$lt": new Date(endDate)
                                    }
                                },
                                { "PULocationID": locationID }
                            ]
                        }
                    }

                ]).then((data) => {
                    //console.log(data)
                    res.status(200).json({ message: 'success', taxiAmount: data.length });
                }).catch((err) => {
                    console.log(err)
                    res.status(404).json({ message: 'error' })
                })
                // YellowTripDataModel.find(
                //     {
                //         $and: [
                //             {
                //                 tpep_pickup_datetime: {
                //                     $gte: new Date(2020, 11, 13),
                //                     $lt: new Date(2020, 12, 15)
                //                 }
                //             },
                //             { PULocationID: 90 }
                //         ],

                //     }).limit(5).then((data) => {
                //         res.status(200).json({ data: data });
                //     }).catch((err) => {
                //         console.log(err)
                //         res.status(404)
                //     })
            } catch (err) {
                console.log(err)
            }
        }),
        app.get('/getLongestDistanceLocations?', async (req, res) => {
            var day = parseInt(req.query.$day);
            try {

                var data = await YellowTripDataModel.aggregate([
                    {
                        "$addFields": {


                            "day": {
                                "$dayOfMonth": "$tpep_pickup_datetime"
                            }
                        }
                    },
                    {
                        "$match": {
                            "$and": [
                                { "day": day },
                                { "passenger_count": { "$gt": 0 } },
                                { "DOLocationID": { "$ne": 265 } }
                            ]
                        }
                    },
                    {
                        "$sort": { "trip_distance": -1 }
                    },
                    { "$limit": 1 }
                ]);
                var locationData = await TaxiZoneModel.aggregate([
                    {
                        "$match": { "$or": [{ "LocationID": parseInt(data[0].PULocationID) }, { "LocationID": parseInt(data[0].DOLocationID) }] }
                    }
                ]);
                for (let i = 0; i < locationData.length; i++) {
                    locationData[i]['tripDistance'] = data[0]['trip_distance']
                }
                var resultData = {
                    tripInfo: [...data],
                    locationInfo: [...locationData]

                }
                console.log(resultData)

                res.status(200).json({ message: 'success', data: resultData });

            } catch (err) {
                console.log(err)
            }
        }),
        app.get('/queryOne', async (req, res) => {
            try{

                var data = await TripDataModel
                .aggregate([
                  {
                    $group: {
                      _id: {
                        $dateToString: {
                          format: '%Y-%m-%d',
                          date: '$tpep_pickup_datetime',
                        },
                      },
                      totalPassengerCount: { $sum: '$passenger_count' },
                    },
                  },
            
                  {
                    $sort: { totalPassengerCount: -1 },
                  },
            
                  {
                    $limit: 5,
                  },
                ])

                res.status(200).json({ message: 'success', data: data });

            }
            catch(e){
                console.warn(e)
            }
           
          })
}