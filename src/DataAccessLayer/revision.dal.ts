import { Revision, RevisionInput, RevisionOutput } from "../models/Revision";

export const createRevisionDal = async (
  payload: RevisionInput
): Promise<RevisionOutput> => {
  return await Revision.create(payload);
};

export const getRevisionsDoneByUserDal = async (
  email: string
): Promise<RevisionOutput[]> => {
  const revisions = await Revision.findAll({
    where: { submitted_by: email },
    limit: 20,
  });
  if (revisions.length === 0) throw `revisions not found for ${email}`;

  return revisions;
};

export const deleteRevisionByEmailDal = async (id: string) => {
  return await Revision.destroy({
    where: {
      revision_id: id,
    },
  });
};
