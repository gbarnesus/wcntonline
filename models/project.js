var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



var Project = mongoose.model('Project', new Schema({
  id: ObjectId,
  projectInfo: {
        name: String,
        number: {type: String, unique: true},
        address: String,
        city: String,
        state: String,
        zip: String,
      },
      projectTeam: {
        projectManager: {
          name: String,
          email: String,
          phone: String
      },
        projectSuperindendent: {
          name: String,
          email: String,
          phone: String
        }
      },
      subcontractor: Array,
      rfiData : Array,
      submittals: Array,
      punchlist: Array,
      plans: Array,
      specs: Array




}));

module.exports = Project;
