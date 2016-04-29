var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



var DocumentUp = mongoose.model('Document', new Schema({
  id: ObjectId,
  projectNumber: String,
  documentType: String,
  documentName: String,
  documentSubject: String,
  documentFile: Array
}));

module.exports = DocumentUp;
