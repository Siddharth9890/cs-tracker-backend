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
  email: string
): Promise<SubmissionOutput[]> => {
  const submissions = await Submission.findAll({
    where: { submitted_by: email },
    limit: 20,
  });
  if (submissions.length === 0) throw `revisions not found for ${email}`;

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
  email: string,
  questionName: string
): Promise<SubmissionOutput> => {
  const submission = await Submission.findOne({
    where: { submitted_by: email, question_name: questionName },
    order: [["completion_date", "DESC"]],
  });
  if (!submission)
    throw `submission not found for ${email} and ${questionName}`;
  return submission;
};
