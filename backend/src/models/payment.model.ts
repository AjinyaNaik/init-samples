import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

import sequelize from "../config/database";

export type PaymentStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;

  declare order_id: number;

  declare stripe_payment_intent_id: string | null;
  declare stripe_charge_id: string | null;

  // Amount in cents
  declare amount: number;

  declare currency: CreationOptional<string>;

  declare status: CreationOptional<PaymentStatus>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    stripe_payment_intent_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    stripe_charge_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    amount: {
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
        "SUCCEEDED",
        "FAILED",
        "REFUNDED",
        "PARTIALLY_REFUNDED"
      ),
      allowNull: false,
      defaultValue: "PENDING",
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
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Payment;