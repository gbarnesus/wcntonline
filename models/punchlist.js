var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var Punchlist = mongoose.model('Punchlist', new Schema({

  projectNumber: String,
  itemNumber: String,
  punchDescription: String,
  responsibleContractor: String,
  creationDate: String,
  responsibleContractor: String,
  dueDate: String,
  punchStatus: String,
  punchlistFile: Array

    }));


module.exports = Punchlist;
