import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class SampleType extends Model {
  declare id: number;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

SampleType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "sample_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default SampleType;