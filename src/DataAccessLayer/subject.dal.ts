import { Subject, SubjectInput, SubjectOutput } from "../models/Subject";

export const createSubjectDal = async (
  payload: SubjectInput
): Promise<SubjectOutput> => {
  return await Subject.create(payload);
};

export const updateSubjectDal = async (
  subjectId: string,
  payload: Partial<SubjectInput>
): Promise<SubjectOutput> => {
  const subject = await Subject.findOne({
    where: { id: subjectId },
  });
  if (!subject) throw "Subject not found";

  const updatedSubject = subject.set({
    description: payload.description,
    imageUrl: payload.imageUrl,
    name: payload.name,
    topicCount: payload.topicCount,
  });
  await updatedSubject.save();
  return updatedSubject;
};

export const getAllSubjectsDal = async (): Promise<SubjectOutput[]> => {
  return await Subject.findAll({ limit: 20 });
};

export const getSubjectByIdDal = async (
  subjectId: number
): Promise<SubjectOutput> => {
  const subject = await Subject.findByPk(subjectId);
  if (!subject) throw "Subject not found";
  return subject;
};

export const deleteSubjectByIdDal = async (subjectId: string) => {
  return await Subject.destroy({ where: { id: subjectId } });
};
