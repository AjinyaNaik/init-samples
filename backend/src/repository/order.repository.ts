import Order from "../models/order.model";
import OrderItem from "../models/order_item.model";
import Sample from "../models/sample.model";
import SamplePack from "../models/sample-pack.model";
import sequelize from "../config/database";

export const findSamplesByIds = async (
  sampleIds: number[]
) => {
  return await Sample.findAll({
    where: {
      id: sampleIds,
    },
  });
};

export const findSamplePackById = async (
  samplePackId: number
) => {
  return await SamplePack.findByPk(samplePackId);
};

export const findSamplesByPackId = async (
  samplePackId: number
) => {
  return await Sample.findAll({
    where: {
      sample_pack_id: samplePackId,
    },
  });
};
export const createOrder = async (
  userId: number,
  totalAmount: number,
  transaction: any
) => {
  return await Order.create(
    {
      user_id: userId,
      total_amount: totalAmount,
      status: "PAID",
    },
    {
      transaction,
    }
  );
};

export const createOrderItems = async (
  orderId: number,
  items: {
    sample_id: number;
    price: number;
  }[],
  transaction: any
) => {
  return await OrderItem.bulkCreate(
    items.map((item) => ({
      order_id: orderId,
      sample_id: item.sample_id,
      price: item.price,
    })),
    {
      transaction,
    }
  );
};

export const findPurchasedSamples = async (
  userId: number,
  sampleIds: number[]
) => {
  return await OrderItem.findAll({
    include: [
      {
        model: Order,
        as: "order",
        where: {
          user_id: userId,
        },
        attributes: [],
      },
    ],
    where: {
      sample_id: sampleIds,
    },
  });
};

export const findPurchasedSamplesByUserId = async (
  userId: number
) => {
  const orderItems = await OrderItem.findAll({
    include: [
      {
        model: Order,
        as: "order",
        where: {
          user_id: userId,
        },
        attributes: [],
      },
      {
        model: Sample,
        as: "sample",
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return orderItems;
};

export const startTransaction = async () => {
  return await sequelize.transaction();
};