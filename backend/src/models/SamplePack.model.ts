import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SamplePackAttributes {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  created_at: Date;
  updated_at: Date;
}

interface SamplePackCreationAttributes
  extends Optional<
    SamplePackAttributes,
    "id" | "description" | "cover_image" | "created_at" | "updated_at"
  > {}

class SamplePack
  extends Model<
    SamplePackAttributes,
    SamplePackCreationAttributes
  >
  implements SamplePackAttributes
{
  public id!: number;
  public name!: string;
  public description!: string | null;
  public cover_image!: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
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