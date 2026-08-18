import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class License extends Model {
  declare id: number;
  declare version: number;
  declare terms: string;
  declare is_active: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

License.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    terms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "licenses",
    timestamps: true,
    underscored: true,
  }
);

export default License;