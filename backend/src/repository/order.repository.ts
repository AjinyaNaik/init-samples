import Order from "../models/order.model";
import OrderItem from "../models/order_item.model";
import Sample from "../models/sample.model";
import SamplePack from "../models/sample-pack.model";
import sequelize from "../config/database";




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
    sample_id?: number | null;
    sample_pack_id?: number | null;
    price: number;
  }[],
  transaction: any
) => {
  return await OrderItem.bulkCreate(
    items.map((item) => ({
      order_id: orderId,
      sample_id: item.sample_id ?? null,
      sample_pack_id: item.sample_pack_id ?? null,
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

export const startTransaction = async () => {
  return await sequelize.transaction();
};

export const findPurchasedSamplesByUserId = async (
  userId: number
) => {
  const orderItems = await OrderItem.findAll({
    where: {
      sample_pack_id: null,
    },
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
        attributes: [
          "id",
          "name",
          "description",
          "preview_url",
          "sample_pack_id",
          "category",
          "sample_type",
          "genres",
          "metadata",
          "download_count",
          "created_at",
          "updated_at",
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return orderItems;
};


export const findPurchasedSamplePacksByUserId = async (
  userId: number
) => {
  const orderItems = await OrderItem.findAll({
    where: {
      sample_id: null,
    },
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
        model: SamplePack,
        as: "sample_pack",
        include: [
          {
            association: "samples",
            attributes: [
              "id",
              "name",
              "description",
              "preview_url",
              "sample_pack_id",
              "category",
              "sample_type",
              "genres",
              "metadata",
              "download_count",
              "created_at",
              "updated_at",
            ],
          },
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return orderItems;
};

export const userOwnsSample = async (
  userId: number,
  sampleId: number
) => {
  const sample = await Sample.findByPk(sampleId, {
    attributes: ["id", "sample_pack_id"],
  });

  if (!sample) {
    return false;
  }

  // Directly purchased sample
  const directPurchase = await OrderItem.findOne({
    where: {
      sample_id: sampleId,
    },
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
  });

  if (directPurchase) {
    return true;
  }

  // Sample belongs to a pack
  if (sample.sample_pack_id !== null) {
    const packPurchase = await OrderItem.findOne({
      where: {
        sample_pack_id: sample.sample_pack_id,
      },
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
    });

    if (packPurchase) {
      return true;
    }
  }

  return false;
};

export const userOwnsSamplePack = async (
  userId: number,
  samplePackId: number
) => {
  const purchase = await OrderItem.findOne({
    where: {
      sample_pack_id: samplePackId,
    },
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
  });

  return !!purchase;
};