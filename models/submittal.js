var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var Submittal = mongoose.model('Submittal', new Schema({

      projectNumber: String,
      submittalNumber: String,
      submittalSubject: String,
      submittalSpecification: String,
      responsibleContractor: String,
      submittalStatus: String,
      reviewer: String,
      reviewDate: String,
      reviewCode: String,
      submittalFile: Array

    }));


module.exports = Submittal;
