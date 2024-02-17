import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db";
import { Question } from "./Question";
import { TopicUnderSubject } from "./TopicUnderSubject";
import User from "./User";

interface RevisionAttributes {
  id: number;
  questionId: number;
  topicId: number;
  isCompleted: boolean;
  completionDate: Date;
  revisionDate: Date;
  submittedBy: number;
  revised: boolean;
}

export interface RevisionInput extends Required<RevisionAttributes> {}
export interface RevisionOutput extends Required<RevisionAttributes> {}

export class Revision
  extends Model<RevisionAttributes, RevisionInput>
  implements RevisionOutput
{
  public id!: number;
  public questionId!: number;
  public revisionDate!: Date;
  public submittedBy!: number;
  public topicId!: number;
  public isCompleted!: boolean;
  public completionDate!: Date;
  public revised!: boolean;
}

Revision.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    completionDate: { type: DataTypes.DATE, allowNull: false },
    revisionDate: { type: DataTypes.DATE, allowNull: false },
    submittedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    revised: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  },
  {
    timestamps: false,
    sequelize,
    tableName: "revisions",
  }
);
