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
  topicName: string,
  payload: Partial<TopicUnderSubjectInput>
): Promise<TopicUnderSubjectOutput> => {
  const topic = await TopicUnderSubject.findOne({
    where: { topic_name: topicName },
  });
  if (!topic) throw "Topic not found";

  const updatedTopic = topic.set({
    topic_description: payload.topic_description,
    topic_name: payload.topic_name,
    question_count: payload.question_count,
    under_which_subject: payload.under_which_subject,
  });
  await updatedTopic.save();
  return updatedTopic;
};

export const getAllTopicsUnderSubjectDal = async (
  subjectName: string
): Promise<TopicUnderSubjectOutput[]> => {
  const topics = await TopicUnderSubject.findAll({
    where: { under_which_subject: subjectName },
    limit: 20,
  });
  if (topics.length === 0) throw `no topics found for ${subjectName}`;
  return topics;
};

export const getTopicByNameDal = async (
  topicName: string
): Promise<TopicUnderSubjectOutput> => {
  const question = await TopicUnderSubject.findOne({
    where: { topic_name: topicName },
  });
  if (!question) throw "Question not found";
  return question;
};

export const deleteTopicByNameDal = async (topicName: string) => {
  return await TopicUnderSubject.destroy({ where: { topic_name: topicName } });
};
