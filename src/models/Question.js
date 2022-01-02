const mongoose = require("mongoose");
const Topic = require("./TopicUnderSubject");

const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A question must have a name"],
    unique: true,
  },
  difficulty: {
    type: String,
    required: [true, "A question must have a difficulty"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "Difficulty must be easy,medium,hard",
    },
  },
  linkToSolution: {
    type: String,
    required: [true, "A question must have a solution"],
  },
  linkToLeetCode: {
    type: String,
    required: [true, "A question must have leet code link"],
  },
  topicUnderSubject: {
    type: String,
    ref: "SubjectTopics",
    required: true,
    validate: {
      validator: async function (value) {
        const result = await Topic.findOne({ name: value });
        if (!result) return false;
        return true;
      },
      message: "Invalid Topic  name",
    },
  },
});
const QuestionModel = mongoose.model("Questions", questionSchema);
module.exports = QuestionModel;
