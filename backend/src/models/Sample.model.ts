import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Sample extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public audio_url!: string; 
  public sample_pack_id!: number | null;
  public sample_type!: "DRUMS" | "BASS" | "MIDS" | "HIGHS" | "VOCALS";
  public genres!: string[];
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
    sample_type: {
      type: DataTypes.ENUM("DRUMS", "BASS", "MIDS", "HIGHS", "VOCALS"),
      allowNull: false,
    },
    genres: {
      type: DataTypes.JSON,
      allowNull: false,
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