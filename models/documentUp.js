var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



var DocumentUp = mongoose.model('Document', new Schema({
  id: ObjectId,
  documentType: String,
  documentName: String,
  documentDesc: String
}));

module.exports = DocumentUp;
