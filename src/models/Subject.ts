import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../db";

interface SubjectsAttributes {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  topicCount: number;
}

export interface SubjectInput extends Optional<SubjectsAttributes, "id"> {}
export interface SubjectOutput extends Required<SubjectsAttributes> {}

export class Subject
  extends Model<SubjectsAttributes, SubjectInput>
  implements SubjectOutput
{
  public id!: number;
  public name!: string;
  public description!: string;
  public imageUrl!: string;
  public topicCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        min: {
          args: [3],
          msg: "Subject name should be greater than 3 characters",
        },
        max: {
          args: [30],
          msg: "Subject name should be less than 30 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        min: {
          args: [5],
          msg: "Subject description should be greater than 5 characters",
        },
        max: {
          args: [500],
          msg: "Subject description should be less than 500 characters",
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Image should be url",
        },
      },
    },
    topicCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "topic Count should be greater than 0",
        },
        max: {
          args: [1000],
          msg: "topic count  should be less than 1000",
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
        fields: ["name"],
      },
    ],
  }
);
