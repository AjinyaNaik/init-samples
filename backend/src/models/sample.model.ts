import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SampleAttributes {
  id: number;
  name: string;
  description: string | null;
  audio_url: string;
  sample_pack_id: number | null;
  category: string[];
  sample_type: string[];
  is_selling: boolean;
  genres: string[] | null;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

interface SampleCreationAttributes
  extends Optional<
    SampleAttributes,
    | "id"
    | "description"
    | "sample_pack_id"
    | "is_selling"
    | "metadata"
    | "created_at"
    | "updated_at"
  > {}

class Sample
  extends Model<
    SampleAttributes,
    SampleCreationAttributes
  >
  implements SampleAttributes
{
  public id!: number;
  public name!: string;
  public description!: string | null;
  public audio_url!: string;
  public sample_pack_id!: number | null;
  public category!: string[];
  public sample_type!: string[];
  public is_selling!: boolean;
  public genres!: string[] | null;
  public metadata!: Record<string, any>;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Sample.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    audio_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sample_pack_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    is_selling: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }, 

    category: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    sample_type: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    genres: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "samples",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Sample;