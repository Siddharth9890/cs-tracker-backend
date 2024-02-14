import User, { UserInput, UserOutput } from "../models/User";

export const createUserDal = async (
  payload: UserInput
): Promise<UserOutput> => {
  return await User.create(payload);
};

export const updateUserDal = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) throw "User not found";

  const updatedUser = user.set({
    email: payload.email,
    accountStatus: payload.accountStatus,
    userName: payload.userName,
    refreshToken: payload.refreshToken,
    role: payload.role,
    ip: payload.ip,
    totalNumberQuestionsSolved: payload.totalNumberQuestionsSolved,
    verified: payload.verified,
    verificationCode: payload.verificationCode,
  });
  await updatedUser.save();
  return updatedUser;
};

export const getUserByEmailDal = async (email: string): Promise<UserOutput> => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw "User not found";
  return user;
};

export const getUserByRefreshTokenDal = async (
  refreshToken: string
): Promise<UserOutput> => {
  const user = await User.findOne({ where: { refreshToken: refreshToken } });
  if (!user) throw "User not found";
  return user;
};

export const getUserByIdDal = async (id: string): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) throw "User not found";
  return user;
};

export const deleteUserByIdDal = async (id: string) => {
  return await User.destroy({ where: { id: id } });
};
