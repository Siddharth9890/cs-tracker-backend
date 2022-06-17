import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";
import { Subject } from "./Subject";

interface TopicUnderSubjectAttributes {
  topic_id: string;
  topic_name: string;
  topic_description: string;
  question_count: number;
  under_which_subject: string;
}

export interface TopicUnderSubjectInput
  extends Optional<TopicUnderSubjectAttributes, "topic_id"> {}

export interface TopicUnderSubjectOutput
  extends Required<TopicUnderSubjectAttributes> {}

export class TopicUnderSubject
  extends Model<TopicUnderSubjectAttributes, TopicUnderSubjectInput>
  implements TopicUnderSubjectOutput
{
  public topic_id!: string;
  public topic_name!: string;
  public topic_description!: string;
  public question_count!: number;
  public under_which_subject!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TopicUnderSubject.init(
  {
    topic_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    topic_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [5],
          msg: "Topic name should be greater than 5 characters",
        },
        max: {
          args: [30],
          msg: "Topic name should be less than 30 characters",
        },
      },
    },
    topic_description: {
      type: DataTypes.STRING(50),
      allowNull: false,

      validate: {
        min: {
          args: [5],
          msg: "Topic description should be greater than 5 characters",
        },
        max: {
          args: [30],
          msg: "Topic description should be less than 50 characters",
        },
      },
    },
    question_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Topic count should be greater than 0 ",
        },
        max: {
          args: [100],
          msg: "Topic name should be less than 100",
        },
      },
    },
    under_which_subject: {
      type: DataTypes.STRING(50),
      references: {
        model: Subject,
        key: "subject_name",
      },
    },
  },
  {
    sequelize,
    tableName: "topicUnderSubjects",
    indexes: [
      {
        unique: true,
        fields: ["topic_name"],
      },
    ],
  }
);
