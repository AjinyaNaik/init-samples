import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface SampleAttributes {
  id: number;
  name: string;
  description: string | null;
  audio_url: string | null;
  preview_url: string | null;
  sample_pack_id: number | null;
  category: string[];
  sample_type: string[];
  can_preview: boolean;
  genres: string[] | null;
  metadata: Record<string, any>;
  download_count: number;
  price: number | null;
  created_at: Date;
  updated_at: Date;
}

interface SampleCreationAttributes
  extends Optional<
    SampleAttributes,
    | "id"
    | "description"
    | "preview_url"
    | "sample_pack_id"
    | "can_preview"
    | "metadata"
    | "download_count"
    | "price"
    | "created_at"
    | "updated_at"
  > { }

class Sample
  extends Model<
    SampleAttributes,
    SampleCreationAttributes
  >
  implements SampleAttributes {
  declare id: number;
  declare name: string;
  declare description: string | null;
  declare audio_url: string | null;
  declare preview_url: string | null;
  declare sample_pack_id: number | null;
  declare category: string[];
  declare sample_type: string[];
  declare can_preview: boolean;
  declare genres: string[] | null;
  declare metadata: Record<string, any>;
  declare download_count: number;
  declare price: number | null;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
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
    preview_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sample_pack_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    can_preview: {
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
    download_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null
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