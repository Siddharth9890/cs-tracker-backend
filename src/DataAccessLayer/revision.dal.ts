import { Revision, RevisionInput, RevisionOutput } from "../models/Revision";

export const createRevisionDal = async (
  payload: RevisionInput
): Promise<RevisionOutput> => {
  return await Revision.create(payload);
};

export const getRevisionsDoneByUserDal = async (
  userId: string
): Promise<RevisionOutput[]> => {
  const revisions = await Revision.findAll({
    where: { submittedBy: userId },
    limit: 20,
  });
  if (revisions.length === 0) throw `revisions not found for ${userId}`;

  return revisions;
};

export const deleteRevisionByEmailDal = async (id: string) => {
  return await Revision.destroy({
    where: {
      id: id,
    },
  });
};
