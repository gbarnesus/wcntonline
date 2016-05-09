var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var Rfi = mongoose.model('Rfi', new Schema({

    projectNumber: String,
    rfiName: String,
    rfiSubject: String,
    responsibleContractor: String,
    assignee: String,
    dateInitiated: String,
    dueDate: String,
    ballInCourt: String,
    scheduleImpact: String,
    costImpact:String,
    rfiFile: Array


    }));


module.exports = Rfi;
