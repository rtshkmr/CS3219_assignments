const mongoose = require("mongoose");
const { getConnection } = require("./mongoose");

const connection = getConnection();

// model schema for note:
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});


const Note = module.exports = connection.model('note', noteSchema);

module.exports.get = function (callback, limit) {
    Note.find(callback).limit(limit);
}