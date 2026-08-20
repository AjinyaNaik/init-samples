import * as orderRepository from "../repository/order.repository";
import { findStandaloneSamplesByIds } from "../repository/sample.repository";
import { findSamplePacksByIds } from "../repository/sample-pack.repository";
import { findUserById } from "../repository/user.repository";
import { CreateSampleOrderData, CreateSamplePackOrderData } from "./dtos/order.dto";
import { sendOrderReceiptEmail } from "./email.service";

export const createOrderSamples = async (
  userId: number,
  data: CreateSampleOrderData,
  paymentId?: string
) => {
  const sampleIds = data.sample_ids ?? [];
  const samples = await findStandaloneSamplesByIds(sampleIds);
  const user = await findUserById(userId);

  let totalAmountCents = 0;
  for (const s of samples) {
    if (s.price) {
      totalAmountCents += Math.round(s.price * 100);
    }
  }

  const finalPaymentId = paymentId || `dummy_payment_${Date.now()}`;
  const transaction = await orderRepository.startTransaction();

  try {
    const order = await orderRepository.createOrder(
      userId,
      totalAmountCents,
      transaction
    );

    await orderRepository.createOrderItems(
      order.id,
      samples.map((sample) => ({
        sample_id: sample.id,
        sample_pack_id: null,
        price: Math.round((sample.price || 0) * 100),
      })),
      transaction
    );

    await transaction.commit();

    // Map samples to match ReceiptItem[] strictly
    const receiptItems = samples.map((s) => ({
      name: s.name,
      price: s.price ?? 0,
    }));

    if (user?.email) {
      await sendOrderReceiptEmail({
        to: user.email,
        username: user.username,
        orderId: order.id.toString(),
        items: receiptItems,
        totalAmount: totalAmountCents / 100,
      });
    }

    return {
      order,
      payment_id: finalPaymentId,
      items: samples,
    };
  } 
  catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const createOrderSamplePacks = async (
  userId: number,
  data: CreateSamplePackOrderData,
  paymentId?: string
) => {
  const samplePackIds = data.sample_pack_ids ?? [];
  const samplePacks = await findSamplePacksByIds(samplePackIds);
  const user = await findUserById(userId);

  // Convert prices to cents for INTEGER column storage
  let totalAmountCents = 0;
  for (const s of samplePacks) {
    if (s.price) {
      totalAmountCents += Math.round(s.price * 100);
    }
  }

  const finalPaymentId = paymentId || `dummy_payment_${Date.now()}`;
  const transaction = await orderRepository.startTransaction();

  try {
    const order = await orderRepository.createOrder(
      userId,
      totalAmountCents,
      transaction
    );

    await orderRepository.createOrderItems(
      order.id,
      samplePacks.map((samplePack) => ({
        sample_id: null,
        sample_pack_id: samplePack.id,
        price: Math.round((samplePack.price || 0) * 100),
      })),
      transaction
    );

    await transaction.commit();

    // Map sample packs and include their inner samples for the receipt
    const receiptItems = samplePacks.map((sp: any) => ({
      name: sp.name,
      price: sp.price ?? 0,
      samples: sp.samples ? sp.samples.map((sample: any) => ({ name: sample.name })) : [],
    }));

    if (user?.email) {
      await sendOrderReceiptEmail({
        to: user.email,
        username: user.username,
        orderId: order.id.toString(),
        items: receiptItems,
        totalAmount: totalAmountCents / 100,
      });
    }

    return {
      order,
      payment_id: finalPaymentId,
      items: samplePacks,
    };
  } 
  catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getMyPurchasedSamples = async (userId: number) => {
  const orderItems = await orderRepository.findPurchasedSamplesByUserId(userId);
  const samples = orderItems.map((item: any) => item.sample).filter(Boolean);

  return Array.from(
    new Map(samples.map((sample: any) => [sample.id, sample])).values()
  );
};

export const getMyPurchasedSamplePacks = async (userId: number) => {
  const orderItems = await orderRepository.findPurchasedSamplePacksByUserId(userId);
  const samplePacks = orderItems.map((item: any) => item.sample_pack).filter(Boolean);

  return Array.from(
    new Map(samplePacks.map((samplePack: any) => [samplePack.id, samplePack])).values()
  );
};