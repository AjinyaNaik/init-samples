import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";
import User from "./user.model";

export type SellerRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

class SellerRequest extends Model<
  InferAttributes<SellerRequest>,
  InferCreationAttributes<SellerRequest>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  declare status: CreationOptional<SellerRequestStatus>;

  declare reviewed_by: number | null;

  declare reviewed_at: Date | null;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

SellerRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "APPROVED",
        "REJECTED"
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    reviewed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    reviewed_at: {
      type: DataTypes.DATE,
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
    tableName: "seller_requests",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default SellerRequest;