const mongoose = require("mongoose");
var express = require('express');
const Stat = require('../models/stat');
var axios = require('axios');
// const dbName = 'I-will-Monitor';
// mongoose.connect(`mongodb://localhost/${dbName}`); //connecting to the database
let service = axios.create({
  baseURL: 'https://newsapi.org/v2/'
})

let service2 = axios.create({
  baseURL: 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10'
})

let serviceGeocode = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?&address='
})

var para = 'everything?q=quantum+computer&sortBy=publishedAt&apiKey=6c4097e89cda4c1d90da9731e8f19a5b'


var router = express.Router();

var Twitter = require('twitter');

var client = new Twitter({

  consumer_key: 'uE5JRqAuANNi1prvSUOqgnCqu',
  consumer_secret: 'cIA8lIujP1DcGaXJFnkW8awIQmbGNqnoZA5mg0KiDWv92plOGC',
  access_token_key: '2874420983-IAr72KblWIaDdKsCeBeZae4wOq1aiGrnBKjdypq',
  access_token_secret: 'xWyUxR9agU2js4ApvFFkBriLr6CLgCtkEF0dYe9jiSGwW'
});

let getBreackChainError = () => {
  let err = new Error();
  err.name = 'BreackChainError';
  return err;
};

router.get('/geocode', (req, res, next) => {
  serviceGeocode.get('Allemagne')
    .then(response => {
      // let bounds = response.data.results[0].geometry
      console.log(response.data.results[0])
      res.json(response.data.results[0])
    })
    .catch(err => console.log(err))

})

router.get('/search/', (req, res, next) => {
  let term = req.query.keyword
  term = term.toUpperCase()

  console.log("DEBUG I want to see query:", req.query)
  // console.log("DEBUG I want to APIcode:",process.env.GEOCODE_API)
  var geocode = "";
  let tempArr = req.query.keyword.toUpperCase().split(',')
  let tempArrLocation = req.query.location.toUpperCase().split(',')
  console.log("DEBUG tempArr", tempArr)
  console.log("DEBUG locationArr", tempArrLocation)
  let delayCounter = 3000;
  for (let i = 0; i < tempArr.length; i++) {
    for (let j = 0; j < tempArrLocation.length; j++) {
      if (tempArr[i] === "" || tempArrLocation[j] === "") {
        continue
      }
      
      let query = {
        keyword: tempArr[i],
        location: tempArrLocation[j]
      }
      
      Stat.find(query)
        .then(stats => {
          if (stats.length == 0) {
            delayCounter+=1000;
            console.log("Query in forloop:", query)
            serviceGeocode.get(`${query.location}&key=${process.env.GEOCODE_API}`)
              .then(response => {
                // let bounds = response.data.results[0].geometry
                console.log("in forloop after geocode", response.data.results[0])
                let lat = response.data.results[0].geometry.location.lat
                let lng = response.data.results[0].geometry.location.lng
                let upperRightLat = parseFloat(response.data.results[0].geometry.bounds.northeast.lat)
                let upperRightLng = parseFloat(response.data.results[0].geometry.bounds.northeast.lng)
                let bottomLeftLat = parseFloat(response.data.results[0].geometry.bounds.southwest.lat)
                let bottomLeftLng = parseFloat(response.data.results[0].geometry.bounds.southwest.lng)
                let radius = 0.5 * Math.sqrt(((upperRightLat - bottomLeftLat) * 110.574) ** 2 + ((upperRightLng - bottomLeftLng) * Math.cos((upperRightLat - bottomLeftLat) / 2 / 180 * Math.PI) * 111.320) ** 2)
                geocode = lat + "," + lng + "," + radius + "km";
                console.log("in forloop I see geocode:", geocode)
                return geocode
              })
              .then(() => {
                setTimeout(function () {
                  let term = query.keyword;
                  console.log("Before search tweet check query:", term, " geocode:", geocode, "||end")
                  client.get('search/tweets', { q: `${term}`, geocode: `${geocode}`, count: 100 }, function (error, tweets, response) {
                    // '52.50206,13.40701,30km'
                    // '48.85994, 2.34146, 30km'
                    // '45.47625,9.18302, 30km'
                    // console.log(tweets);
                    console.log("DEBUG: Got tweet");
                    let createArr = tweets.statuses.map(x => x.created_at)
                    let today = new Date();
                    console.log("DEBUG: today", today)
                    let filterArr = createArr.filter(function (s) {
                      let temp = new Date(s);
                      if (today - temp < 86400000) {
                        return true
                      } else {
                        return false
                      }
                    })
                    let obj = {}
                    obj["keyword"] = `${term}`
                    obj["location"] = `${query.location}`;
                    obj["count"] = filterArr.length;
                    Stat.create(obj);
                    let arr = [];
                    arr.push(obj)
                    console.log(arr)
                    // res.json(arr)
                  })
                }, 0);
              })


          }
        })
    }
  }
  let timecount=0
  // setInterval(function(){ console.log("Hello I am timer",timecount); timecount+=1; }, 1000);

  let query = {
    keyword: { $in: tempArr },
    location: { $in: tempArrLocation }
  }
  setTimeout(function () {
    console.log("AHHHHHHHHHHHHHHHHHH!!!!! 5secon")
  Stat.find(query)

    .then(stats => {
      // console.log(`find query: ${req.query.keywords.toUpperCase()} and ${req.query.location ? req.query.location.toUpperCase() : ""}`)
      console.log(`keyword: {$in : [ ${req.query.keyword.toUpperCase()}]}, location: {$in : [${req.query.location.toUpperCase()}]} `)



      console.log("first Stat: ", stats)
      if (stats.length != 0) {

        res.json(stats);
        // throw getBreackChainError();
      } else if (stats.length == 0 && !req.query.location) {
        Stat.find({ keyword: `${req.query.keyword.toUpperCase()}` })
          .then(stats => {
            console.log(`find query: ${req.query.keyword.toUpperCase()}`)
            console.log("second Stat: ", stats)
            if (stats.length != 0) {
              console.log("second Stat output: ")
              res.json(stats);
              // throw getBreackChainError();
            } else if (stats.length == 0 ) {
              Stat.find()
                .then(stats => {
                  console.log(`find query: none`)
                  console.log("third Stat: ", stats)
                  if (stats.length != 0) {
                    res.json(stats);
                    // throw getBreackChainError();
                  }
                })
            }


          })
      }
    })
  }, delayCounter);
    
  // )
  // .catch(err => next(err))
})





// Route to get all countries
router.get('/', (req, res, next) => {
  console.log("DEBUG I want to see query here:", req.query)


  Stat.find()
    .then(stats => {
      // console.log("Stat: ",stats)
      res.json(stats);
    })
    .catch(err => next(err))
  /////////twitter test//////////
  // var twitter = new Twitter();
  //Callback functions
  // var error = function (err, response, body) {
  // console.log('ERROR []', err);
  // };
  // var success = function (data) {
  // console.log('Data [%s]', data);
  // res.json(data)
  // };

  // twitter.getSearch({'q':'#fifa','count': 10}, error, success);
  //////////////
  // client.get('search/tweets', {q: 'mongoDB',geocode:'52.50206,13.40701,100km'}, function(error, tweets, response) {
  //   // console.log(tweets);
  //   console.log("Got tweet");
  //   res.json(tweets)
  // });
  ////////////
  // then(response=>{
  //   console.log(response)
  //   res.json(response)
  // });



  ////twitter test end//////////////////////////
  //   //////////
  // service.get(para)
  // .then(response=>{
  //   // console.log(response.data)
  //   res.json(response.data)
  // });

  // service2.get()
  // .then(response=>{
  //   var parseString = require('xml2js').parseString;
  //   // console.log(response.data)
  //   var xml = "<root>Hello xml2js!</root>"
  //   parseString(response.data, function (err, result) {
  //   // console.dir(result);
  //   res.json(result);
  // });
  // })
  // .catch(err => console.log(err))
  // Stat.create({
  //   "keyword": "KNN",
  //   "areaCount":[{country:"JP",count:42},{country:"FR",count:42}],
  //   "yearCount":[{year:2017,count:22},{year:2018,count:42}]
  // })
  // .then(response=>{
  //   console.log("Res: ", response)

  // })
  // .catch(err => console.log(err))
  ///////////////
  // Stat.findOneAndUpdate({"keyword":'GAN'},{$push:{areaCount:{"country":"NO","count":"517"}}})
  //   .then((response)=>
  // res.json(response))
});


// Route to get a static sample of countries
router.get('/static-sample', (req, res, next) => {
  res.json([{
    "keyword": "GAN",
    "areaCount": [{ country: "DE", count: 15 }, { country: "FR", count: 42 }],
    "yearCount": [{ year: 2017, count: 22 }, { year: 2018, count: 33 }]

  },
  {
    "keyword": "NLP",
    "areaCount": [{ country: "BR", count: 42 }, { country: "IT", count: 42 }],
    "yearCount": [{ year: 2017, count: 22 }, { year: 2018, count: 33 }]

  }
  ])
});

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});



module.exports = router;
