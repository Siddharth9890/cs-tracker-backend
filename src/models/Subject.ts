import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";

// subject like dsa,web

interface SubjectsAttributes {
  subject_id: string;
  subject_name: string;
  subject_description: string;
  image_url: string;
  topic_count: number;
}

export interface SubjectInput
  extends Optional<SubjectsAttributes, "subject_id"> {}
export interface SubjectOutput extends Required<SubjectsAttributes> {}

export class Subject
  extends Model<SubjectsAttributes, SubjectInput>
  implements SubjectOutput
{
  public subject_id!: string;
  public subject_name!: string;
  public subject_description!: string;
  public image_url!: string;
  public topic_count!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subject.init(
  {
    subject_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    subject_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [5],
          msg: "Subject name should be greater than 5 characters",
        },
        max: {
          args: [30],
          msg: "Subject name should be less than 30 characters",
        },
      },
    },
    subject_description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "Subject description should be greater than 5 characters",
        },
        max: {
          args: [100],
          msg: "Subject description should be less than 50 characters",
        },
      },
    },
    image_url: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Image should be url",
        },
      },
    },
    topic_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "topic Count should be greater than 0",
        },
        max: {
          args: [100],
          msg: "topic count  should be less than 100",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "subjects",
    indexes: [
      {
        unique: true,
        fields: ["subject_name"],
      },
    ],
  }
);
