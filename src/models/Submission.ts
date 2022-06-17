import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";
import { Question } from "./Question";
import { TopicUnderSubject } from "./TopicUnderSubject";
import User from "./User";

interface SubmissionAttributes {
  submission_id: string;
  question_name: string;
  question_topic: string;
  is_completed: boolean;
  completion_date: Date;
  submitted_by: string;
  notes: string;
}

export interface SubmissionInput extends Required<SubmissionAttributes> {}
export interface SubmissionOutput extends Required<SubmissionAttributes> {}
export class Submission
  extends Model<SubmissionAttributes, SubmissionInput>
  implements SubmissionOutput
{
  public submission_id!: string;
  public question_name!: string;
  public question_topic!: string;
  public is_completed!: boolean;
  public completion_date!: Date;
  public submitted_by!: string;
  public notes!: string;
}

Submission.init(
  {
    submission_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    submitted_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
    },
    notes: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "submissions",
  }
);
