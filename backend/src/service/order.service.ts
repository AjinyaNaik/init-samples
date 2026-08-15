import * as orderRepository from "../repository/order.repository";
import {findSamplesByPackId,findStandaloneSamplesByIds} from "../repository/sample.repository";
import {findSamplePacksByIds, } from "../repository/sample-pack.repository";
import { CreateOrderData } from "./dtos/order.dto";

const DUMMY_SAMPLE_PRICE = 100;

export const createOrderSamples = async (
  userId: number,
  data: CreateOrderData
) => {
  const sampleIds = data.sample_ids ?? [];
   if (sampleIds.length === 0) {
    throw new Error(
      "At least one sample is required"
    );
  }


  const samples = await findStandaloneSamplesByIds(sampleIds);
  // check if all sampleIds are valid
  if (samples.length !== sampleIds.length) {
    throw new Error("One or more sample IDs are invalid");
  }
  /*
   * 3. Check if user already owns any
   */
  const purchasedSamples =
    await orderRepository.findPurchasedSamplesByUserId(userId);

  const purchasedSampleIds = new Set(
    purchasedSamples.map(
      (item) => item.sample_id
    )
  );

  const alreadyOwned = sampleIds.filter(
    (id) => purchasedSampleIds.has(id)
  );

  if (alreadyOwned.length > 0) {
    throw new Error(
      `You already own sample(s): ${alreadyOwned.join(", ")}`
    );
  }

  /*
   * 4. Calculate total
   *
   * Dummy price for now.
   * Later replace this with sample.price.
   */
  const totalAmount =
    DUMMY_SAMPLE_PRICE * samples.length;

  /*
   * 5. Dummy payment
   */
  const paymentId =
    `dummy_payment_${Date.now()}`;

  const transaction =
    await orderRepository.startTransaction();

  try {
    /*
     * 7. Create order
     */
    const order =
      await orderRepository.createOrder(
        userId,
        totalAmount,
        transaction
      );

    /*
     * 8. Create order items
     */
    await orderRepository.createOrderItems(
      order.id,
      samples.map((sample) => ({
        sample_id: sample.id,
        sample_pack_id: null,
        price: DUMMY_SAMPLE_PRICE,
      })),
      transaction
    );

    /*
     * 9. Commit
     */
    await transaction.commit();

    return {
      order,
      payment_id: paymentId,
      items: samples,
    };
  } catch (error) {
    /*
     * Rollback if anything fails
     */
    await transaction.rollback();
    throw error;
  }
};



export const getMyPurchasedSamples = async (
  userId: number
) => {
  const orderItems =
    await orderRepository.findPurchasedSamplesByUserId(
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