const mongoose = require("mongoose");

// subject like dsa,web
const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A subject must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A subject must have a description"],
  },
  imageUrl: {
    type: String,
    required: [true, "A subject must have a image url"],
  },
  topicCount: {
    type: Number,
    required: [true, "A subject must have a topic count"],
  },
});

const SubjectModel = mongoose.model("Subjects", subjectSchema);
module.exports = SubjectModel;
