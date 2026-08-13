import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SamplePackAttributes {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  category: string[];
  sample_type: string[];
  genres: string[] | null;
  is_selling: boolean; // <-- Added
  created_at: Date;
  updated_at: Date;
}

interface SamplePackCreationAttributes
  extends Optional<
    SamplePackAttributes,
    | "id"
    | "description"
    | "cover_image"
    | "category"
    | "sample_type"
    | "genres"
    | "is_selling" // <-- Added
    | "created_at"
    | "updated_at"
  > {}

class SamplePack
  extends Model<
    SamplePackAttributes,
    SamplePackCreationAttributes
  >
  implements SamplePackAttributes
{
  declare id: number;
  declare name: string;
  declare description: string | null;
  declare cover_image: string | null;
  declare category: string[];
  declare sample_type: string[];
  declare genres: string[] | null;
  declare is_selling: boolean; // <-- Added

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

SamplePack.init(
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
    cover_image: {
      type: DataTypes.STRING,
      allowNull: true,
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
    is_selling: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "sample_packs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default SamplePack;