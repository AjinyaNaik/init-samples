import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;

  declare user_id: number;

  // Store money in cents
  declare total_amount: number;

  declare currency: CreationOptional<string>;

  declare status: CreationOptional<OrderStatus>;

  // Stripe Checkout Session
  declare stripe_checkout_session_id: string | null;

  created_at!: CreationOptional<Date>;
  updated_at!: CreationOptional<Date>;
}

Order.init(
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

    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "usd",
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "FAILED",
        "CANCELLED",
        "REFUNDED"
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    stripe_checkout_session_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Order; 