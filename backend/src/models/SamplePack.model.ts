import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class SamplePack extends Model {
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