const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({  
  keyword: {
    type: String,
    required: [true, 'The country name is required']
  },
  areaCount: {
    type: [{country:String,count:Number}],
    default: []
  },
  yearCount: {
    type: [{year:Number,count:Number}],
    default: []
  }
});

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;