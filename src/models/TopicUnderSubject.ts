import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";
import { Subject } from "./Subject";

interface TopicUnderSubjectAttributes {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  underWhichSubject: number;
}

export interface TopicUnderSubjectInput
  extends Optional<TopicUnderSubjectAttributes, "id"> {}

export interface TopicUnderSubjectOutput
  extends Required<TopicUnderSubjectAttributes> {}

export class TopicUnderSubject
  extends Model<TopicUnderSubjectAttributes, TopicUnderSubjectInput>
  implements TopicUnderSubjectOutput
{
  public id!: number;
  public name!: string;
  public description!: string;
  public questionCount!: number;
  public underWhichSubject!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TopicUnderSubject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [5],
          msg: "Topic name should be greater than 5 characters",
        },
        max: {
          args: [300],
          msg: "Topic name should be less than 300 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,

      validate: {
        min: {
          args: [5],
          msg: "Topic description should be greater than 5 characters",
        },
        max: {
          args: [500],
          msg: "Topic description should be less than 500 characters",
        },
      },
    },
    questionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Topic count should be greater than 0 ",
        },
        max: {
          args: [1000],
          msg: "Topic name should be less than 1000",
        },
      },
    },
    underWhichSubject: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "topicUnderSubjects",
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);
