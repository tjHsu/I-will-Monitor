const mongoose = require("mongoose");
var express = require('express');
const Stat = require('../models/stat');
var axios = require('axios');
// const dbName = 'I-will-Monitor';
// mongoose.connect(`mongodb://localhost/${dbName}`); //connecting to the database
let service = axios.create({
  baseURL:'https://newsapi.org/v2/'
})

let service2 = axios.create({
  baseURL:'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10'
})

var para='everything?q=quantum+computer&sortBy=publishedAt&apiKey=6c4097e89cda4c1d90da9731e8f19a5b'


var router = express.Router();

// var Twitter = require('twitter-node-client').Twitter;
// var config={
//   "consumerKey": "uE5JRqAuANNi1prvSUOqgnCqu",
//   "consumerSecret": "cIA8lIujP1DcGaXJFnkW8awIQmbGNqnoZA5mg0KiDWv92plOGC",
//   "accessToken": "2874420983-IAr72KblWIaDdKsCeBeZae4wOq1aiGrnBKjdypq",
//   "accessTokenSecret": "xWyUxR9agU2js4ApvFFkBriLr6CLgCtkEF0dYe9jiSGwW",
//   "callBackUrl": ""
// }
var Twitter = require('twitter');
 
var client = new Twitter({

  consumer_key: 'uE5JRqAuANNi1prvSUOqgnCqu',
  consumer_secret: 'cIA8lIujP1DcGaXJFnkW8awIQmbGNqnoZA5mg0KiDWv92plOGC',
  access_token_key: '2874420983-IAr72KblWIaDdKsCeBeZae4wOq1aiGrnBKjdypq',
  access_token_secret: 'xWyUxR9agU2js4ApvFFkBriLr6CLgCtkEF0dYe9jiSGwW'
});





// Route to get all countries
router.get('/', (req, res, next) => {



  // Stat.find()
  //   .then(stats => {
  //       // console.log("Stat: ",stats)
  //     res.json(stats);
  //   })
  //   .catch(err => next(err))
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
client.get('search/tweets', {q: 'node.js',geocode:'52.50206,13.40701,100km'}, function(error, tweets, response) {
  // console.log(tweets);
  console.log("Got tweet");
  res.json(tweets)
});
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
    "areaCount":[{country:"DE",count:15},{country:"FR",count:42}],
    "yearCount":[{year:2017,count:22},{year:2018,count:33}]
    
},
{    
    "keyword": "NLP",
    "areaCount":[{country:"BR",count:42},{country:"IT",count:42}],
    "yearCount":[{year:2017,count:22},{year:2018,count:33}]
    
}
])
});

// Route to add a country
router.post('/', (req, res, next) => {
  let {name, capitals, area, description} = req.body
  Country.create({name, capitals, area, description})
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});



module.exports = router;
