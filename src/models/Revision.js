const mongoose = require("mongoose");

const revisionSchema = mongoose.Schema({
  questionName: {
    type: String,
    ref: "Questions",
    required: true,
  },
  questionTopic: {
    type: String,
    ref: "SubjectTopics",
    required: true,
  },
  submittedBy: {
    type: String,
    ref: "UserProfile",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  revisionDate: {
    type: Date,
    default: undefined,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const RevisionModel = mongoose.model("Revision", revisionSchema);

module.exports = RevisionModel;
