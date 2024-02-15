import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";
import { TopicUnderSubject } from "./TopicUnderSubject";

interface QuestionAttributes {
  id: number;
  name: string;
  description: string;
  howManyTimesSolved: number;
  difficulty: string;
  videoLink: string;
  problemLink: string;
  underWhichTopic: string;
}

export interface QuestionInput
  extends Optional<QuestionAttributes, "id" | "howManyTimesSolved"> {}
export interface QuestionOutput extends Required<QuestionAttributes> {}

export class Question
  extends Model<QuestionAttributes, QuestionInput>
  implements QuestionAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public howManyTimesSolved!: number;
  public difficulty!: string;
  public videoLink!: string;
  public problemLink!: string;
  public underWhichTopic!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [5],
          msg: "question name should be greater than 5 characters",
        },
        max: {
          args: [500],
          msg: "question name should be less than 500 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "question description should be greater than 5 characters",
        },
        max: {
          args: [1000],
          msg: "question description should be less than 1000 characters",
        },
      },
    },
    howManyTimesSolved: { type: DataTypes.INTEGER, defaultValue: 0 },
    difficulty: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["easy", "medium", "hard"],
    },
    videoLink: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isUrl: {
          msg: "Enter a valid url",
        },
      },
    },
    problemLink: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isUrl: {
          msg: "Enter a valid url",
        },
      },
    },
    underWhichTopic: {
      type: DataTypes.INTEGER,
      references: {
        model: TopicUnderSubject,
        key: "id",
      },
    },
  },
  {
    tableName: "questions",
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
      {
        unique: true,
        fields: ["videoLink"],
      },
      {
        unique: true,
        fields: ["problemLink"],
      },
    ],
  }
);
