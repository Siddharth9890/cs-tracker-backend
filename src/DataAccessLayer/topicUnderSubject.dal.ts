import {
  TopicUnderSubject,
  TopicUnderSubjectInput,
  TopicUnderSubjectOutput,
} from "../models/TopicUnderSubject";

export const createTopicUnderSubjectDal = async (
  payload: TopicUnderSubjectInput
): Promise<TopicUnderSubjectOutput> => {
  return await TopicUnderSubject.create(payload);
};

export const updateTopicUnderSubjectDal = async (
  topicId: string,
  payload: Partial<TopicUnderSubjectInput>
): Promise<TopicUnderSubjectOutput> => {
  const topic = await TopicUnderSubject.findOne({
    where: { id: topicId },
  });
  if (!topic) throw "Topic not found";

  const updatedTopic = topic.set({
    description: payload.description,
    name: payload.name,
    questionCount: payload.questionCount,
    underWhichSubject: payload.underWhichSubject,
  });
  await updatedTopic.save();
  return updatedTopic;
};

export const getAllTopicsUnderSubjectDal = async (
  subjectId: string
): Promise<TopicUnderSubjectOutput[]> => {
  const topics = await TopicUnderSubject.findAll({
    where: { underWhichSubject: subjectId },
    limit: 20,
  });
  if (topics.length === 0) throw `no topics found for ${subjectId}`;
  return topics;
};

export const getTopicByNameDal = async (
  topicId: string
): Promise<TopicUnderSubjectOutput> => {
  const question = await TopicUnderSubject.findOne({
    where: { id: topicId },
  });
  if (!question) throw "Question not found";
  return question;
};

export const deleteTopicByIdDal = async (topicId: string) => {
  return await TopicUnderSubject.destroy({ where: { id: topicId } });
};
