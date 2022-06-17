import { Subject, SubjectInput, SubjectOutput } from "../models/Subject";

export const createSubjectDal = async (
  payload: SubjectInput
): Promise<SubjectOutput> => {
  return await Subject.create(payload);
};

export const updateSubjectDal = async (
  subjectName: string,
  payload: Partial<SubjectInput>
): Promise<SubjectOutput> => {
  const subject = await Subject.findOne({
    where: { subject_name: subjectName },
  });
  if (!subject) throw "Subject not found";

  const updatedSubject = subject.set({
    subject_description: payload.subject_description,
    image_url: payload.image_url,
    subject_name: payload.subject_name,
    topic_count: payload.topic_count,
  });
  await updatedSubject.save();
  return updatedSubject;
};

export const getAllSubjectsDal = async (): Promise<SubjectOutput[]> => {
  return await Subject.findAll({ limit: 20 });
};

export const getSubjectByNameDal = async (
  subjectName: string
): Promise<SubjectOutput> => {
  const subject = await Subject.findOne({
    where: { subject_name: subjectName },
  });
  if (!subject) throw "Subject not found";
  return subject;
};

export const deleteSubjectByNameDal = async (name: string) => {
  return await Subject.destroy({ where: { subject_name: name } });
};
