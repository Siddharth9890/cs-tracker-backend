import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";
import { Question } from "./Question";
import { TopicUnderSubject } from "./TopicUnderSubject";
import User from "./User";

interface SubmissionAttributes {
  id: number;
  questionId: number;
  topicId: number;
  isCompleted: boolean;
  completionDate: Date;
  submittedBy: number;
  notes: string;
}

export interface SubmissionInput extends Required<SubmissionAttributes> {}
export interface SubmissionOutput extends Required<SubmissionAttributes> {}
export class Submission
  extends Model<SubmissionAttributes, SubmissionInput>
  implements SubmissionOutput
{
  public id!: number;
  public questionId!: number;
  public topicId!: number;
  public isCompleted!: boolean;
  public completionDate!: Date;
  public submittedBy!: number;
  public notes!: string;
}

Submission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: Question,
        key: "id",
      },
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TopicUnderSubject,
        key: "id",
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completionDate: { type: DataTypes.DATE, defaultValue: DataTypes.DATE },
    submittedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
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
