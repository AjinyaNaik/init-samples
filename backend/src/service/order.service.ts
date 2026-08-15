import * as orderRepository from "../repository/order.repository";
import {findSamplesByIds, findSamplesByPackId, findPurchasedSamplesByUserId} from "../repository/sample.repository";
import {findSamplePackById, } from "../repository/sample-pack.repository";
import { CreateOrderData } from "./dtos/order.dto";

const DUMMY_SAMPLE_PRICE = 100;

export const createOrder = async (
  userId: number,
  data: CreateOrderData
) => {
  const sampleIds = data.sample_ids ?? [];
  const samplePackIds = data.sample_pack_ids ?? [];

  if (
    sampleIds.length === 0 &&
    samplePackIds.length === 0
  ) {
    throw new Error(
      "At least one sample or sample pack is required"
    );
  }

  /*
   * 1. Get standalone samples
   */
  const standaloneSamples =
    sampleIds.length > 0
      ? await findSamplesByIds(sampleIds)
      : [];

  /*
   * Make sure all requested samples exist
   */
  if (standaloneSamples.length !== sampleIds.length) {
    throw new Error("One or more samples were not found");
  }

  /*
   * 2. Get samples from sample packs
   */
  const packSamples: typeof standaloneSamples = [];

  for (const packId of samplePackIds) {
  const pack =
    await findSamplePackById(packId);

  if (!pack) {
    throw new Error(
      `Sample pack ${packId} not found`
    );
  }

  const samples =
    await findSamplesByPackId(packId);

  packSamples.push(...samples);
}
  /*
   * 3. Combine all samples
   */
  const allSamples = [
    ...standaloneSamples,
    ...packSamples,
  ];

  /*
   * 4. Remove duplicate samples
   *
   * This handles:
   *
   * User selects:
   * Sample 10
   *
   * AND:
   *
   * Pack 3
   * └── Sample 10
   */
  const uniqueSamples = Array.from(
    new Map(
      allSamples.map((sample) => [
        sample.id,
        sample,
      ])
    ).values()
  );

  if (uniqueSamples.length === 0) {
    throw new Error(
      "No samples found in the selected items"
    );
  }

  const purchasedItems =
  await orderRepository.findPurchasedSamples(
    userId,
    uniqueSamples.map((sample) => sample.id)
  );

if (purchasedItems.length > 0) {
  const alreadyOwned = purchasedItems.map(
    (item) => item.sample_id
  );

  throw new Error(
    `You already own sample(s): ${alreadyOwned.join(", ")}`
  );
}

  /*
   * 5. Calculate total
   *
   * Assuming sample has a `price` field
   * stored in cents.
   */
   const totalAmount =
    DUMMY_SAMPLE_PRICE * uniqueSamples.length;

  /*
   * 6. Dummy payment
   */
  const paymentId = `dummy_payment_${Date.now()}`;

  /*
   * 7. Create order + order items
   *    inside a transaction.
   */
  const transaction =
    await orderRepository.startTransaction();

  try {
    const order =
      await orderRepository.createOrder(
        userId,
        totalAmount,
        transaction
      );

    await orderRepository.createOrderItems(
      order.id,
      uniqueSamples.map((sample) => ({
        sample_id: sample.id,
        price: DUMMY_SAMPLE_PRICE,
      })),
      transaction
    );

    await transaction.commit();

    return {
      order,
      payment_id: paymentId,
      items: uniqueSamples,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getMyPurchasedSamples = async (
  userId: number
) => {
  const orderItems =
    await findPurchasedSamplesByUserId(
      userId
    );

  const samples = orderItems
    .map((item: any) => item.sample)
    .filter(Boolean);

  /*
   * Remove duplicates just in case
   */
  const uniqueSamples = Array.from(
    new Map(
      samples.map((sample: any) => [
        sample.id,
        sample,
      ])
    ).values()
  );

  return uniqueSamples;
};