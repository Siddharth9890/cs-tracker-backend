import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";

export interface UserAttributes {
  id: number;
  userName: string;
  email: string;
  refreshToken: string;
  verificationCode: number;
  role: string;
  totalNumberQuestionsSolved: number;
  ip: string;
  accountStatus: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput
  extends Optional<
    UserAttributes,
    "id" | "refreshToken" | "verificationCode" | "ip"
  > {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public userName!: string;
  public email!: string;
  public refreshToken!: string;
  public verificationCode!: number;
  public role!: string;
  public totalNumberQuestionsSolved!: number;
  public ip!: string;
  public verified!: boolean;
  public accountStatus!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "User Name should be greater than 5 characters",
        },
        max: {
          args: [20],
          msg: "User Name should be less than 20 characters",
        },
        isAlphanumeric: false,
      },
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
    refreshToken: { type: DataTypes.STRING(187) },
    verificationCode: { type: DataTypes.INTEGER },

    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "moderator"],
      defaultValue: "user",
    },
    accountStatus: {
      type: DataTypes.ENUM,
      values: ["active", "disabled", "deleted"],
      defaultValue: "active",
    },
    ip: { type: DataTypes.STRING },
    totalNumberQuestionsSolved: {
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
      {
        unique: true,
        fields: ["userName"],
      },
    ],
  }
);

export default User;
