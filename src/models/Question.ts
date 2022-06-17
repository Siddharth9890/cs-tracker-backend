import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";
import { TopicUnderSubject } from "./TopicUnderSubject";

interface QuestionAttributes {
  question_id: string;
  question_name: string;
  question_description: string;
  how_many_times_solved: number;
  difficulty: string;
  youtube_video_link: string;
  leet_code_problem_link: string;
  under_which_topic: string;
}

export interface QuestionInput
  extends Optional<
    QuestionAttributes,
    "question_id" | "how_many_times_solved"
  > {}
export interface QuestionOutput extends Required<QuestionAttributes> {}

export class Question
  extends Model<QuestionAttributes, QuestionInput>
  implements QuestionAttributes
{
  public question_id!: string;
  public question_name!: string;
  public question_description!: string;
  public how_many_times_solved!: number;
  public difficulty!: string;
  public youtube_video_link!: string;
  public leet_code_problem_link!: string;
  public under_which_topic!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    question_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [5],
          msg: "question name should be greater than 5 characters",
        },
        max: {
          args: [30],
          msg: "question name should be less than 30 characters",
        },
      },
    },
    question_description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "question description should be greater than 5 characters",
        },
        max: {
          args: [100],
          msg: "question description should be less than 100 characters",
        },
      },
    },
    how_many_times_solved: { type: DataTypes.INTEGER, defaultValue: 0 },
    difficulty: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["easy", "medium", "hard"],
    },
    youtube_video_link: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isUrl: {
          msg: "Enter a valid url",
        },
        isYoutubeUrl(value: string) {
          return value.includes("https://www.youtube.com/watch");
        },
      },
    },
    leet_code_problem_link: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isUrl: {
          msg: "Enter a valid url",
        },
        isLeetCodeUrl(value: string) {
          return value.includes("https://leetcode.com/problems");
        },
      },
    },
    under_which_topic: {
      type: DataTypes.STRING(50),
      references: {
        model: TopicUnderSubject,
        key: "topic_name",
      },
    },
  },
  {
    tableName: "questions",
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ["question_name"],
      },
      {
        unique: true,
        fields: ["youtube_video_link"],
      },
      {
        unique: true,
        fields: ["leet_code_problem_link"],
      },
    ],
  }
);
