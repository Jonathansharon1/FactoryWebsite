const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const shiftSchema = new mongoose.Schema(
  {
    date: { type: String, default: Date.now },
    startingHour: String,
    endingHour: String,
  },
  { versionKey: false }
);

// A 'model' is a class with which we construct documents in a collection
const Shift = mongoose.model('shift', shiftSchema, 'shifts');
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'person').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.

module.exports = Shift;
