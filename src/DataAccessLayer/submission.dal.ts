import {
  Submission,
  SubmissionInput,
  SubmissionOutput,
} from "../models/Submission";

export const createSubmissionDal = async (
  payload: SubmissionInput
): Promise<SubmissionOutput> => {
  return await Submission.create(payload);
};

export const getSubmissionsDoneByUserDal = async (
  userId: string
): Promise<SubmissionOutput[]> => {
  const submissions = await Submission.findAll({
    where: { submittedBy: userId },
    limit: 20,
  });
  if (submissions.length === 0) throw `revisions not found for ${userId}`;

  return submissions;
};

export const getOneQuestionDoneByUserDal = async (
  id: string
): Promise<SubmissionOutput> => {
  const submission = await Submission.findByPk(id);
  if (!submission) throw `submission not found for ${id}`;
  return submission;
};

export const getLatestSubmissionDal = async (
  userId: string,
  questionId: string
): Promise<SubmissionOutput> => {
  const submission = await Submission.findOne({
    where: { submittedBy: userId, questionId: questionId },
    order: [["completion_date", "DESC"]],
  });
  if (!submission)
    throw `submission not found for ${userId} and ${questionId}`;
  return submission;
};
