import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";

export interface UserAttributes {
  user_id: string;
  user_name: string;
  email: string;
  refresh_token: string;
  secret: string;
  secret_backup: string;
  multi_factor_enabled: boolean;
  role: string;
  total_number_of_questions_done_by_user: number;
  ip: string;
  account_status: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput
  extends Optional<
    UserAttributes,
    | "user_id"
    | "refresh_token"
    | "secret"
    | "secret_backup"
    | "multi_factor_enabled"
    | "ip"
  > {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public user_id!: string;
  public user_name!: string;
  public email!: string;
  public refresh_token!: string;
  public secret!: string;
  public secret_backup!: string;
  public multi_factor_enabled!: boolean;
  public role!: string;
  public total_number_of_questions_done_by_user!: number;
  public ip!: string;
  public verified!: boolean;
  public account_status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "Name should be greater than 5 characters",
        },
        max: {
          args: [20],
          msg: "Name should be less than 20 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        min: {
          args: [5],
          msg: "Email should be greater than 5 characters",
        },
        max: {
          args: [30],
          msg: "Email should be less than 30 characters",
        },
      },
    },
    refresh_token: { type: DataTypes.STRING(187) },
    secret: { type: DataTypes.STRING(52) },
    secret_backup: { type: DataTypes.STRING(50) },
    multi_factor_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "moderator"],
      defaultValue: "user",
    },
    account_status: {
      type: DataTypes.ENUM,
      values: ["active", "disabled", "deleted"],
      defaultValue: "active",
    },
    ip: { type: DataTypes.STRING },
    total_number_of_questions_done_by_user: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    paranoid: true,
    tableName: "users",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default User;
