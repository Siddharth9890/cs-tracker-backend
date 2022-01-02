const mongoose = require("mongoose");
const Subjects = require("./Subjects");

const subjectTopicsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A topic must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A topic must have a description"],
  },
  questionsCount: {
    type: Number,
    required: [true, "A topic must have count of questions "],
  },
  subject: {
    type: String,
    ref: "Subjects",
    required: true,
    validate: {
      validator: async function (value) {
        const result = await Subjects.findOne({ name: value });
        if (!result) return false;
        return true;
      },
      message: "Invalid Subject name",
    },
  },
});

const SubjectTopicsModel = mongoose.model("SubjectTopics", subjectTopicsSchema);

module.exports = SubjectTopicsModel;
