const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: Number,
    departmentID: {type: String},
    shifts: [
      {
        date: {type: String },
        startingHour: String,
        endingHour: String
    }
    ]
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', employeeSchema, 'employees');
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.

module.exports = Employee;
