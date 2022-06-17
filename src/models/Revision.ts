import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";
import { Question } from "./Question";
import { TopicUnderSubject } from "./TopicUnderSubject";
import User from "./User";

interface RevisionAttributes {
  revision_id: string;
  question_name: string;
  question_topic: string;
  is_completed: boolean;
  completion_date: Date;
  revision_date: Date;
  submitted_by: string;
}

export interface RevisionInput extends Required<RevisionAttributes> {}
export interface RevisionOutput extends Required<RevisionAttributes> {}

export class Revision
  extends Model<RevisionAttributes, RevisionInput>
  implements RevisionOutput
{
  public revision_id!: string;
  public question_name!: string;
  public revision_date!: Date;
  public submitted_by!: string;
  public question_topic!: string;
  public is_completed!: boolean;
  public completion_date!: Date;
}

Revision.init(
  {
    revision_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    question_name: {
      type: DataTypes.STRING(50),
      allowNull: false,

      references: {
        model: Question,
        key: "question_name",
      },
    },
    question_topic: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: TopicUnderSubject,
        key: "topic_name",
      },
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completion_date: { type: DataTypes.DATE, allowNull: false },
    revision_date: { type: DataTypes.DATE, allowNull: false },
    submitted_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "revisions",
  }
);
