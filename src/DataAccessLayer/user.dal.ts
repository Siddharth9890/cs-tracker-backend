import User, { UserInput, UserOutput } from "../models/User";

export const createUserDal = async (
  payload: UserInput
): Promise<UserOutput> => {
  return await User.create(payload);
};

export const updateUserDal = async (
  id: string,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) throw "User not found";

  const updatedUser = user.set({
    email: payload.email,
    multi_factor_enabled: payload.multi_factor_enabled,
    account_status: payload.account_status,
    user_name: payload.user_name,
    refresh_token: payload.refresh_token,
    role: payload.role,
    ip: payload.ip,
    total_number_of_questions_done_by_user:
      payload.total_number_of_questions_done_by_user,
    secret: payload.secret,
    secret_backup: payload.secret_backup,
    verified: payload.verified,
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
  const user = await User.findOne({ where: { refresh_token: refreshToken } });
  if (!user) throw "User not found";
  return user;
};

export const getUserByIdDal = async (id: string): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) throw "User not found";
  return user;
};

export const deleteUserByIdDal = async (id: string) => {
  return await User.destroy({ where: { user_id: id } });
};
