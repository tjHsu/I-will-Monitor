const mongoose = require("mongoose");
const Stat = require('../models/stat');
const User = require('../models/user');


const Schema   = mongoose.Schema; //not needed?

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI); //connecting to the database

const stat=new Stat(
    {    
        keyword: "REACT",
        location: "DE",
        count: 20
    }
)

Stat.create([
    {    
        keyword: "REACT",
        location: "BERLIN",
        count: 20
    },
    {    
        keyword: "REACT",
        location: "PARIS",
        count: 40
    },
    {    
        keyword: "ANGULAR",
        location: "BERLIN",
        count: 60
    },
    {    
        keyword: "ANGULAR",
        location: "PARIS",
        count: 30
    }]
)

// Stat.create([
//     {    
//         keyword: "VUE",
//         location: "BERLIN",
//         count: 15
//     },
//     {    
//         keyword: "VUE",
//         location: "PARIS",
//         count: 15
//     },
//     {    
//         keyword: "VUE",
//         location: "LONDON",
//         count: 15
//     },
//     {    
//         keyword: "REACT",
//         location: "LONDON",
//         count: 60
//     },
//     {    
//         keyword: "ANGULAR",
//         location: "LONDON",
//         count: 10
//     }
// ])

// const stat=new Stat(
//     {    
//         keyword: "GAN",
//         areaCount:[{country:"DE",count:15},{country:"FR",count:42}],
//         yearCount:[{year:2017,count:22},{year:2018,count:33}]
        
//     }
// )

// const stat2=new Stat(
//     {    
//         keyword: "NLP",
//         areaCount:[{country:"BR",count:42},{country:"IT",count:42}],
//         yearCount:[{year:2017,count:22},{year:2018,count:33}]
        
//     }
// )


const user = new User(
    {
        email: "lars@",
        name: "Lars",
        imgURL: "",
        keywords: ["GAN", "Block chain","NLP"]
    })
const user2 = new User(
    {
        email: "lars@",
        name: "Lars",
        imgURL: "",
        keywords: ["GAN", "Block chain","NLP"]
    })



Stat.deleteMany()
.then(() => User.deleteMany())
// .then(() => user.save())
// .then(() => stat.save())
// .then(() => Game.create(games))
// .then(() => console.log(`\n Created a collection of ${games.length} games \n`))
.then(() =>  User.register(user, "lars123"))
// .then((UserDocDB) => console.log(`Created a collection with 1 user \n`))
// .then(() => Review.create(reviews))
// .then((ReviewDocDB) => console.log(`Created a collection of ${reviews.length} reviews\n`))
// .then(() => stat2.save())
.then(() => mongoose.connection.close())
.catch(err => console.log("ERROR ERROR ERROR: \n \n", err));




//