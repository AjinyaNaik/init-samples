import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Genre extends Model {
  declare id: number;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Genre.init(
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
    tableName: "genres",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Genre;